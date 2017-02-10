/* @flow */
import type { AST, Node } from '../flowtypes/AST'

export default class Generator {
  generate(node: AST | Node): ?string {
    const generateCSSValue = this.generate.bind(this)

    switch (node.type) {
      case 'CSSValue':
        return node.body.map(generateCSSValue).join(' ')

      case 'Function':
        return `${node.callee}(${node.params.map(generateCSSValue).join(',')})`

      case 'Dimension':
        return node.value + node.unit

      case 'Float':
        return `${node.integer ? node.integer : ''}.${node.fractional}`

      case 'Operator':
        return ` ${node.value} `

      case 'Parenthese':
        return node.value

      // refactor to nested multi value
      case 'Separator':
        return node.value

      case 'Identifier':
      case 'Keyword':
      case 'Integer':
        return node.value

      default:
        throw new TypeError('Unknown Type')
    }
  }
}
