/* @flow */
import type { ASTNode } from '../../../flowtypes/AST'

export default class Generator {
  generators: Object

  constructor(generators: Object = {}) {
    this.generators = generators
  }

  generate(node: ASTNode): string {
    const generateCSSValue = this.generate.bind(this)
    const customGenerator = this.generators[node.type]

    if (customGenerator) {
      return customGenerator(node, generateCSSValue)
    }

    switch (node.type) {
      case 'MultiValue':
        return node.body.map(generateCSSValue).join(',')

      case 'CSSValue':
        return node.body.map(generateCSSValue).join(' ')

      case 'Expression':
        return node.body.map(generateCSSValue).join('')

      case 'FunctionExpression':
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

      case 'StringLiteral':
        return node.quote + node.value + node.quote

      case 'Identifier':
      case 'Important':
      case 'Keyword':
      case 'Integer':
      case 'Parenthese':
      case 'HexColor':
      case 'Separator':
      case 'URL':
        return node.value

      default:
        return ''
    }
  }
}
