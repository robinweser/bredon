/* @flow */
import type { Token } from '../flowtypes/Token'
import type { AST, Node, SimpleNode, DimensionNode, FloatNode, FunctionNode } from '../flowtypes/AST'

import CSSValueRules from './utils/CSSValueRules'
import createTokenizer from './tokenizer'

const emptyToken: Token = {
  type: '__empty_token',
  value: ''
}

const dimensions = {
  percentage_unit: 'percentage',
  font_length_unit: 'font-length',
  viewport_length_unit: 'viewport-length',
  absolute_length_unit: 'absolute-length',
  angle_unit: 'angle',
  duration_unit: 'duration',
  frequency_unit: 'frequency',
  resolution_unit: 'resolution'
}

/**
Color:
hash hexcolor
(Function) rgb(a), hsl(a)
String:
quote(same-value) identifier quote(same-value)
*/
export default class Parser {
  tokenizer: Function;
  options: Object;
  currentPosition: number;
  currentToken: Token;
  parenBalance: number;
  tokens: Array<Token>;

  constructor(options?: Object = {}) {
    this.tokenizer = createTokenizer(CSSValueRules, ['whitespace'])
    this.options = options
  }

  getNextToken(position: number): Token {
    const nextPosition = this.currentPosition + position
    if (nextPosition < this.tokens.length) {
      return this.tokens[nextPosition]
    }

    return emptyToken
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
          dimension: dimensions[nextToken.type],
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

  parseKeyword(): SimpleNode {
    if (this.currentToken.type === 'keyword') {
      return {
        type: 'Keyword',
        value: this.currentToken.value
      }
    }
  }

  parseIdentifier(): SimpleNode | FunctionNode {
    if (this.currentToken.type === 'identifier') {
      const nextToken = this.getNextToken(1)

      if (nextToken.type === 'paren' && nextToken.value === '(') {
        if (this.currentToken.value === 'url') {
          return this.parseURL()
        }

        if (this.currentToken.value.indexOf('calc') > -1) {
          const node = this.parseFunction()

          const functionParams = node.params
          node.params = [{
            type: 'Expression',
            body: functionParams
          }]

          return node
        }

        return this.parseFunction()
      }

      return {
        type: 'Identifier',
        value: this.currentToken.value
      }
    }
  }

  parseFunction(): FunctionNode {
    const node = {
      type: 'Function',
      callee: this.currentToken.value,
      params: []
    }

    this.updateCurrentToken(2)
    ++this.parenBalance

    const startParenBalance = this.parenBalance

    while (
      this.isRunning() &&
        (this.currentToken.type !== 'paren' ||
          this.currentToken.type === 'paren' && this.currentToken.value !== ')' ||
          this.parenBalance !== startParenBalance)
    ) {
      // skip all commas directly
      while (this.isRunning() && this.currentToken.type === 'comma') {
        this.updateCurrentToken(1)
      }

      node.params.push(this.walkTokens())
      this.updateCurrentToken()
    }

    --this.parenBalance
    return node
  }

  parseURL(): FunctionNode {
    const node = {
      type: 'Function',
      callee: this.currentToken.value,
      params: []
    }

    let urlValue = ''

    this.updateCurrentToken(2)
    ++this.parenBalance

    const startParenBalance = this.parenBalance

    while (
      this.isRunning() &&
        (this.currentToken.type !== 'paren' ||
          this.currentToken.type === 'paren' && this.currentToken.value !== ')' ||
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
    if (this.currentToken.type === 'double_quote' || this.currentToken.type === 'single_quote') {
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
        type: 'Parenthese',
        value: this.currentToken.value
      }
    }
  }

  parseComma(): SimpleNode {
    if (this.currentToken.type === 'comma') {
      return {
        type: 'Separator',
        value: this.currentToken.value
      }
    }
  }

  parseOperator(): SimpleNode {
    if (this.currentToken.type === 'operator') {
      return {
        type: 'Operator',
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

  parseHexColor() {
    if (this.currentToken.type === 'hexadecimal') {
      return {
        type: 'HexColor',
        value: this.currentToken.value
      }
    }
  }

  parseWhitespace() {
    if (this.currentToken.type === 'whitespace') {
      this.updateCurrentToken(1)

      while (this.isRunning() && this.currentToken.type === 'whitespace') {
        this.updateCurrentToken(1)
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

    const node = this.parseWhitespace() ||
      this.parseComma() ||
      this.parseNumber() ||
      this.parseFloat() ||
      this.parseKeyword() ||
      this.parseIdentifier() ||
      this.parseOperator() ||
      this.parseHexColor() ||
      this.parseParen() ||
      this.parseString()

    if (!node) {
      throw new SyntaxError(
        `Could not parse the token "${this.currentToken.type}" with the value "${this.currentToken.value}"`
      )
    }

    ++this.currentPosition
    return node
  }

  parse(input: string): AST {
    this.tokens = this.tokenizer(input)

    this.currentPosition = 0
    this.parenBalance = 0

    const ast = {
      type: 'CSSValue',
      body: []
    }

    while (this.isRunning()) {
      ast.body.push(this.walkTokens())
    }

    return ast
  }
}
