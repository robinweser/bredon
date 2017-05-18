/* @flow */
import type { AST, Node } from '../flowtypes/AST'

export default class Generator {
  formatters: Object

  constructor(formatters: Object = {}) {
    this.formatters = formatters
  }

  generate(node: AST | Node): ?string {
    const generateCSSValue = this.generate.bind(this)
    const customFormatter = this.formatters[node.type]

    if (customFormatter) {
      return customFormatter(node, generateCSSValue)
    }

    switch (node.type) {
      case 'MultiValue':
        return node.body.map(generateCSSValue).join(',')

      case 'CSSValue':
        return node.body.map(generateCSSValue).join(' ')

      case 'Expression':
        return node.body.map(generateCSSValue).join('')

      case 'Function':
        return `${node.callee}(${node.params.map(generateCSSValue).join(',')})`

      case 'Dimension':
        return node.value + node.unit

      case 'Float':
        return `${node.integer ? node.integer : ''}.${node.fractional}`

      case 'Operator':
        // for addition and substraction we use spacings left and right
        // to ensure correct syntax inside calc expressions
        return node.value === '+' || node.value === '-'
          ? ` ${node.value} `
          : node.value

      case 'String':
        return node.quote + node.value + node.quote

      case 'Identifier':
      case 'Important':
      case 'Keyword':
      case 'Integer':
      case 'Parenthese':
      case 'HexColor':
      case 'URL':
        return node.value

      default:
        throw new TypeError('Unknown Type')
    }
  }
}
