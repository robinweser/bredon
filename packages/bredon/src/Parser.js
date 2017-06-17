/* @flow */
import tokenize from 'tokenize-sync'

import parseMultiValue from './utils/parseMultiValue'

import type { Token } from '../../../flowtypes/Token'
import type {
  AST,
  Node,
  SimpleNode,
  DimensionNode,
  FloatNode,
  FunctionNode
} from '../../../flowtypes/AST'

const ruleMap = {
  keyword: /^(initial|inherit|unset)$/,
  important: /^(!important)$/,
  percentage_unit: /^%$/,
  font_length_unit: /^(em|ex|ch|rem)$/,
  viewport_length_unit: /^(vw|vh|vmin|vmax)$/,
  absolute_length_unit: /^(cm|mm|q|in|pt|pc|px)$/,
  angle_unit: /^(deg|grad|rad|turn)$/,
  duration_unit: /^((m)?s)$/,
  frequency_unit: /^((k)?Hz)$/,
  resolution_unit: /^(dpi|dpcm|dppx)$/,
  singe_quote: /^('|\\')$/,
  double_quote: /^("|\\")$/,
  operator: /^(\+|-|\*|\/)$/,
  identifier: /^[a-z-]+$/i,
  number: /^\d+$/,
  url_chars: /^[&:=?]$/,
  floating_point: /^[.]$/,
  hexadecimal: /^#([0-9a-f]*)$/i,
  whitespace: /^\s+$/,
  paren: /^[()]$/,
  comma: /^,+$/
}

const basicNodes = {
  keyword: 'Keyword',
  important: 'Important',
  comma: 'Separator',
  operator: 'Operator',
  hexadecimal: 'HexColor'
}

export default class Parser {
  currentPosition: number
  currentToken: Token
  parenBalance: number
  tokens: Array<Token>

  getNextToken(position: number): Token {
    const nextPosition = this.currentPosition + position

    if (nextPosition < this.tokens.length) {
      return this.tokens[nextPosition]
    }

    return {
      type: 'empty_token',
      value: '',
      start: 0,
      end: 0
    }
  }

  isRunning() {
    return this.currentPosition < this.tokens.length
  }

  parseNumber(): SimpleNode | DimensionNode | FloatNode {
    if (this.currentToken.type === 'number') {
      const nextToken = this.getNextToken(1)

      if (nextToken.type.indexOf('unit') > -1) {
        ++this.currentPosition

        return {
          type: 'Dimension',
          value: parseInt(this.currentToken.value, 10),
          dimension: nextToken.type.replace('_unit', '').replace('_', '-'),
          unit: nextToken.value
        }
      }

      if (nextToken.type === 'floating_point') {
        const integerPart = this.currentToken.value
        this.updateCurrentToken(1)
        return this.parseFloat(integerPart)
      }

      return {
        type: 'Integer',
        value: parseInt(this.currentToken.value, 10)
      }
    }
  }

  parseIdentifier(): SimpleNode | FunctionNode {
    if (this.currentToken.type === 'identifier') {
      const nextToken = this.getNextToken(1)

      if (nextToken.type === 'paren' && nextToken.value === '(') {
        const callee = {
          type: 'Identifier',
          value: this.currentToken.value
        }

        if (this.currentToken.value === 'url') {
          return this.parseURL(callee)
        }

        if (this.currentToken.value.indexOf('calc') > -1) {
          const node = this.parseFunction(callee)

          const functionParams = node.params

          node.params = [
            {
              type: 'Expression',
              body: functionParams
            }
          ]

          return node
        }

        return this.parseFunction(callee)
      }

      return {
        type: 'Identifier',
        value: this.currentToken.value
      }
    }
  }

  parseFunction(callee: SimpleNode): FunctionNode {
    const node = {
      type: 'Function',
      callee: callee,
      params: []
    }

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
      // skip all commas directly
      while (this.isRunning() && this.currentToken.type === 'comma') {
        this.updateCurrentToken(1)
      }

      node.params.push(this.walkTokens())
      this.updateCurrentToken()
      this.parseWhitespace()
    }

    --this.parenBalance
    return node
  }

  parseURL(callee: SimpleNode): FunctionNode {
    const node = {
      type: 'Function',
      callee: callee,
      params: []
    }

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
      urlValue += this.currentToken.value
      this.updateCurrentToken(1)
    }

    node.params.push({
      type: 'URL',
      value: urlValue
    })

    --this.parenBalance
    return node
  }

  parseString(): SimpleNode {
    if (
      this.currentToken.type === 'double_quote' ||
      this.currentToken.type === 'single_quote'
    ) {
      const quoteType = this.currentToken.type

      const node = {
        type: 'String',
        quote: quoteType === 'double_quote' ? '"' : "'",
        value: ''
      }

      this.updateCurrentToken(1)

      while (this.isRunning() && this.currentToken.type !== quoteType) {
        node.value += this.currentToken.value
        this.updateCurrentToken(1)
      }

      return node
    }
  }

  parseParen(): SimpleNode {
    if (this.currentToken.type === 'paren') {
      // update paren balance
      if (this.currentToken.value === '(') {
        ++this.parenBalance
      } else {
        --this.parenBalance
      }

      return {
        type: 'Parenthesis',
        value: this.currentToken.value
      }
    }
  }

  parseFloat(integerPart?: number): FloatNode {
    if (this.currentToken.type === 'floating_point') {
      const nextToken = this.getNextToken(1)

      if (nextToken.type === 'number') {
        this.updateCurrentToken(1)

        return {
          type: 'Float',
          integer: parseInt(integerPart, 10) || 0,
          fractional: parseInt(nextToken.value, 10)
        }
      }

      throw new SyntaxError('A floating point must be followed by a number.')
    }
  }

  parseBasicNodes(): SimpleNode {
    const nodeType = basicNodes[this.currentToken.type]

    if (nodeType) {
      return {
        type: nodeType,
        value: this.currentToken.value
      }
    }
  }

  parseWhitespace() {
    if (this.currentToken.type === 'whitespace') {
      this.updateCurrentToken(1)

      if (!this.currentToken) {
        return {
          type: '_following_whitespace'
        }
      }
    }
  }

  updateCurrentToken(increment?: number): void {
    if (increment) {
      this.currentPosition += increment
    }

    this.currentToken = this.tokens[this.currentPosition]
  }

  walkTokens(): Node {
    this.updateCurrentToken()

    const node =
      this.parseWhitespace() ||
      this.parseBasicNodes() ||
      this.parseNumber() ||
      this.parseFloat() ||
      this.parseIdentifier() ||
      this.parseParen() ||
      this.parseString()

    if (!node) {
      throw new SyntaxError(
        `Could not parse the token "${this.currentToken
          .type}" with the value "${this.currentToken.value}"`
      )
    }

    ++this.currentPosition
    return node
  }

  parse(input: string): AST {
    this.tokens = tokenize(input, ruleMap)

    this.currentPosition = 0
    this.parenBalance = 0

    const nodes = []

    while (this.isRunning()) {
      nodes.push(this.walkTokens())
    }

    const lastNode = nodes.pop()

    // remove following white space
    if (lastNode.type !== '_following_whitespace') {
      nodes.push(lastNode)
    }

    // split values into multi value if separator is present
    if (nodes.find(node => node.type === 'Separator')) {
      return {
        type: 'MultiValue',
        values: parseMultiValue(nodes)
      }
    }
    return {
      type: 'CSSValue',
      body: nodes
    }
  }
}
