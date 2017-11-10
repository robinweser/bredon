/* @flow */
import type { ASTNode } from '../../../flowtypes/AST'

export default class Generator {
  generators: Object

  constructor(generators?: Object = {}) {
    this.generators = generators
  }

  generate(node: ASTNode): string {
    const generateValue = this.generate.bind(this)
    const customGenerator = this.generators[node.type]

    if (customGenerator) {
      return customGenerator(node, generateValue)
    }

    switch (node.type) {
      case 'ValueList':
        return node.body.map(generateValue).join(',')

      case 'Value':
        return (
          node.body.map(generateValue).join(' ') +
          (node.important ? '!important' : '')
        )

      case 'Expression':
        return node.body.map(generateValue).join('')

      case 'FunctionExpression':
        return `${node.callee}(${node.params.map(generateValue).join(',')})`

      case 'Dimension':
        return node.value + node.unit

      case 'Float':
        return `${node.negative ? '-' : ''}${node.integer !== 0
          ? node.integer
          : ''}.${node.fractional}`

      case 'Operator':
        // for addition and substraction we use spacings left and right
        // to ensure correct syntax inside calc expressions
        return node.value === '+' || node.value === '-'
          ? ` ${node.value} `
          : node.value

      case 'StringLiteral':
        return node.quote + node.value + node.quote

      case 'HexColor':
        return '#' + node.value

      case 'Identifier':
      case 'Parenthesis':
      case 'Separator':
      case 'Integer':
      case 'URL':
        return node.value

      default:
        return ''
    }
  }
}
