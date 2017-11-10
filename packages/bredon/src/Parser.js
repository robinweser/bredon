/* @flow */
import tokenize from 'tokenize-sync'
import {
  dimension,
  integer,
  float,
  important,
  operator,
  identifier,
  expression,
  functionExpression,
  url,
  stringLiteral,
  parenthesis,
  hexColor,
  keyword,
  separator,
  value,
  valueList,
  isSeparator,
} from 'bredon-types'

import isValidUnit from './utils/isValidUnit'
import isValidHexadezimal from './utils/isValidHexadezimal'
import getQuote from './utils/getQuote'

import type { Token } from '../../../flowtypes/Token'
import type {
  ValueList,
  Value,
  Node,
  SimpleNode,
  DimensionNode,
  FloatNode,
  FunctionNode,
} from '../../../flowtypes/AST'

const ruleMap = {
  exclamation_mark: /^[!]$/,
  quote: /^('|\\'|"|\\")$/,
  operator: /^(\+|-|\*|\/)$/,
  identifier: /^[a-z-]+$/i,
  number: /^\d+$/,
  url_chars: /^[&:=?]$/,
  percentage: /^[%]$/,
  floating_point: /^[.]$/,
  hex: /^[#]$/,
  whitespace: /^\s+$/,
  paren: /^[()]$/,
  comma: /^,+$/,
}

export default class Parser {
  currentNode: Value
  nodes: Array<Value>
  currentPosition: number
  currentToken: Token
  parenBalance: number
  scope: string
  important: boolean
  tokens: Array<Token>

  getNextToken(position: number): ?Token {
    const nextPosition = this.currentPosition + position

    if (nextPosition < this.tokens.length) {
      return this.tokens[nextPosition]
    }
  }

  updateCurrentToken(increment?: number = 0): void {
    this.currentPosition += increment
    this.currentToken = this.tokens[this.currentPosition]
  }

  isRunning() {
    return this.currentPosition < this.tokens.length
  }

  setScope(scope?: string): void {
    this.scope = scope || ''
  }

  walkTokens(): Node {
    this.updateCurrentToken()

    // the following token do not return a node
    // but rather add some flags
    while (
      this.currentToken.type === 'comma' ||
      this.currentToken.type === 'whitespace' ||
      this.currentToken.type === 'exclamation_mark'
    ) {
      this.parseSeparator()

      if (!this.currentToken) {
        throw new SyntaxError(
          `A comma separator (,) must be followed by a value.`
        )
      }

      this.parseWhitespace()

      // skip parsing if no more tokens are coming
      // this happens if the strings ends with whitespace
      if (!this.currentToken) {
        return false
      }

      this.parseImportant()

      // skip parsing if no more tokens are coming
      // this time it happens if the last token was an !important
      if (!this.currentToken) {
        return false
      }
    }

    const node =
      this.parseOperator() ||
      this.parseHex() ||
      this.parseNumber() ||
      this.parseFloat() ||
      this.parseIdentifier() ||
      this.parseParenthesis() ||
      this.parseStringLiteral()

    if (!node) {
      throw new SyntaxError(
        `Could not parse the token "${this.currentToken
          .type}" with the value "${this.currentToken.value}"`
      )
    }

    ++this.currentPosition
    return node
  }

  parse(input: string): ValueList {
    this.tokens = tokenize(input, ruleMap)

    this.currentPosition = 0
    this.parenBalance = 0
    this.scope = ''

    this.nodes = []

    this.currentNode = value()
    this.nodes.push(this.currentNode)

    while (this.isRunning()) {
      const node = this.walkTokens()

      if (node) {
        this.currentNode.body.push(node)
      }
    }

    return valueList(this.nodes)
  }

  parseHex(): SimpleNode {
    if (this.currentToken.type === 'hex') {
      this.updateCurrentToken(1)
      let hexValue = ''

      while (
        this.isRunning() &&
        (this.currentToken.type === 'number' ||
          this.currentToken.type === 'identifier')
      ) {
        hexValue += this.currentToken.value
        this.updateCurrentToken(1)
      }

      const hexValueLength = hexValue.length
      // validating correct hex value length
      if (
        hexValueLength !== 3 &&
        hexValueLength !== 6 &&
        hexValueLength !== 8
      ) {
        // TODO: throw invalid hex value length
      }

      // validating correct hex value
      if (!isValidHexadezimal(hexValue)) {
        // TODO: throw invalid hex value
      }

      return hexColor(hexValue)
    }
  }

  parseOperator(): SimpleNode {
    if (this.currentToken.type === 'operator') {
      if (this.scope === 'expression') {
        return operator(this.currentToken.value)
      }

      // parse value separator
      if (this.currentToken.value === '/') {
        return separator()
      }

      // parse numbers and floats with an algebraic sign
      if (this.currentToken.value === '+' || this.currentToken.value === '-') {
        const nextToken = this.getNextToken(1)

        if (nextToken) {
          if (nextToken.type === 'number') {
            const isNegative = this.currentToken.value === '-'

            this.updateCurrentToken(1)
            return this.parseNumber(isNegative)
          }

          if (nextToken.type === 'floating_point') {
            const isNegative = this.currentToken.value === '-'
            this.updateCurrentToken(1)
            return this.parseFloat(0, isNegative)
          }

          throw new SyntaxError(
            `An addition or substraction sign must be used inside expressions ("calc()") or followed by a number/float. Instead found "${nextToken.value}" of type "${nextToken.type}".`
          )
        }

        throw new SyntaxError(
          'An addition or substraction sign must not be used at the end of a string.'
        )
      }

      throw new SyntaxError(
        'A multiplication sign (*) can only be used inside expression ("calc()").'
      )
    }
  }

  parseNumber(
    isNegative?: boolean = false
  ): SimpleNode | DimensionNode | FloatNode {
    if (this.currentToken.type === 'number') {
      const nextToken = this.getNextToken(1)
      const integerPart = parseInt(this.currentToken.value, 10)

      // Parsing dimensions if a number is directly followed
      // by an identifier that matches any of the valid units
      if (
        nextToken &&
        (nextToken.type === 'identifier' || nextToken.type === 'percentage')
      ) {
        if (!isValidUnit(nextToken.value)) {
          throw new SyntaxError(
            `A number (${this.currentToken
              .value}) must be followed by a valid unit. Instead found "${nextToken.value}" of type "${nextToken.type}".`
          )
        }

        ++this.currentPosition

        return dimension(
          integer(integerPart, isNegative),
          nextToken.value.toLowerCase()
        )
      }

      // Parsing floating point numbers if a number is directly followed
      // by a floating point which is followed by a number
      if (nextToken && nextToken.type === 'floating_point') {
        this.updateCurrentToken(1)
        return this.parseFloat(integerPart, isNegative)
      }

      return integer(integerPart, isNegative)
    }
  }

  parseFloat(integerPart?: number, isNegative?: boolean = false): FloatNode {
    // floats can also start with a floating point
    // if the integer part is 0
    if (this.currentToken.type === 'floating_point') {
      const nextToken = this.getNextToken(1)

      if (nextToken) {
        if (nextToken.type === 'number') {
          this.updateCurrentToken(1)

          const floatValue = float(
            integerPart,
            parseInt(nextToken.value, 10),
            isNegative
          )

          const innerNextToken = this.getNextToken(1)

          // Parsing dimensions if a float is directly followed
          // by an identifier that matches any of the valid units
          if (
            innerNextToken &&
            (innerNextToken.type === 'identifier' ||
              innerNextToken.type === 'percentage')
          ) {
            if (!isValidUnit(innerNextToken.value)) {
              throw new SyntaxError(
                `A float (${this.currentToken
                  .value}) must be followed by a valid unit. Instead found "${innerNextToken.value}" of type "${innerNextToken.type}".`
              )
            }

            ++this.currentPosition

            return dimension(floatValue, innerNextToken.value.toLowerCase())
          }

          return floatValue
        }

        throw new SyntaxError(
          `A floating point (.) must be followed by a number. Instead found ${nextToken.value} of type ${nextToken.type}.`
        )
      }

      throw new SyntaxError(
        'A floating point must not be used at the end of a string.'
      )
    }
  }

  parseImportant(): any {
    if (this.currentToken.type === 'exclamation_mark') {
      const nextToken = this.getNextToken(1)

      if (nextToken) {
        if (
          nextToken.type === 'identifier' &&
          nextToken.value.match(/^important$/i) !== null
        ) {
          this.updateCurrentToken(2)
          this.currentNode.important = true
          return
        }

        throw new SyntaxError(
          `An exclamation mark (!) must always be followed by an "important" identifier. Instead found "${nextToken.value}" of type "${nextToken.type}".`
        )
      }

      throw new SyntaxError(
        'An exclamation mark (!) must not be used at the end of a value.'
      )
    }
  }

  parseIdentifier(): SimpleNode | FunctionNode {
    if (this.currentToken.type === 'identifier') {
      const nextToken = this.getNextToken(1)

      // parsing function expression
      if (nextToken && nextToken.type === 'paren' && nextToken.value === '(') {
        const callee = this.currentToken.value

        // special parsing for url functions
        // as they only allow a single url parameter
        if (callee === 'url') {
          return this.parseURL(callee)
        }

        // special parsing for calc functions that includes
        // algebraic expressions with operators and parenthesis
        if (callee.indexOf('calc') !== -1) {
          // setting the expression scope
          // to allow all operators
          this.setScope('expression')
          const node = this.parseFunctionExpression(callee)
          this.setScope()

          const calcExpression = expression(node.params)
          node.params = [calcExpression]

          return node
        }

        return this.parseFunctionExpression(callee)
      }

      return identifier(this.currentToken.value)
    }
  }

  parseFunctionExpression(callee: string): FunctionNode {
    this.updateCurrentToken(2)
    ++this.parenBalance

    const startParenBalance = this.parenBalance

    const params = []

    while (
      this.isRunning() &&
      (this.currentToken.type !== 'paren' ||
        (this.currentToken.type === 'paren' &&
          this.currentToken.value !== ')') ||
        this.parenBalance !== startParenBalance)
    ) {
      // skip all commas directly
      while (this.isRunning() && this.currentToken.type === 'comma') {
        this.updateCurrentToken(1)
      }

      params.push(this.walkTokens())

      this.updateCurrentToken()
      this.parseWhitespace()
    }

    --this.parenBalance
    return functionExpression(callee, params)
  }

  parseURL(callee: string): FunctionNode {
    let urlValue = ''

    this.updateCurrentToken(2)
    ++this.parenBalance

    const startParenBalance = this.parenBalance

    while (
      this.isRunning() &&
      (this.currentToken.type !== 'paren' ||
        (this.currentToken.type === 'paren' &&
          this.currentToken.value !== ')') ||
        this.parenBalance !== startParenBalance)
    ) {
      // concat any token to the url
      // no validation is done here!
      urlValue += this.currentToken.value
      this.updateCurrentToken(1)
    }

    --this.parenBalance
    return functionExpression(callee, [url(urlValue)])
  }

  parseStringLiteral(): SimpleNode {
    if (this.currentToken.type === 'quote') {
      const quote = getQuote(this.currentToken.value)

      let stringValue = ''
      this.updateCurrentToken(1)

      while (this.isRunning() && getQuote(this.currentToken.value) !== quote) {
        stringValue += this.currentToken.value
        this.updateCurrentToken(1)
      }

      return stringLiteral(stringValue, quote)
    }
  }

  parseParenthesis(): SimpleNode {
    if (this.currentToken.type === 'paren') {
      // update paren balance
      if (this.currentToken.value === '(') {
        ++this.parenBalance
      } else {
        --this.parenBalance
      }

      return parenthesis(this.currentToken.value)
    }
  }

  parseSeparator() {
    if (this.currentToken.type === 'comma') {
      this.currentNode = value()
      this.nodes.push(this.currentNode)
      this.updateCurrentToken(1)
    }
  }

  parseWhitespace() {
    if (this.currentToken.type === 'whitespace') {
      this.updateCurrentToken(1)
    }
  }
}
