/* @flow */
import type { AST, ASTNode } from '../flowtypes/AST'

export default class Traverser {
  visitors: Object

  constructor(visitors: Object) {
    this.visitors = visitors
  }

  traverseNodeList(nodeList: Array<ASTNode>, parentNode: ASTNode | null) {
    nodeList.forEach(childNode => this.traverseNode(childNode, parentNode))
  }

  traverseNode(node: ASTNode, parentNode: ASTNode) {
    const methods = this.visitors[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parentNode)
    }

    switch (node.type) {
      case 'CSSValue':
      case 'MutliValue':
      case 'Expression':
        this.traverseNodeList(node.body, node)
        break

      case 'Function':
        this.traverseNodeList(node.params, node)
        break

      case 'Integer':
      case 'Keyword':
      case 'Important':
      case 'Dimension':
      case 'Float':
      case 'Identifier':
      case 'Operator':
      case 'Seperator':
      case 'HexColor':
      case 'URL':
        break

      default:
        throw new TypeError(`Unkown Type ${node.type}`)
    }

    if (methods && methods.exit) {
      methods.exit(node, parentNode)
    }
  }

  traverse(ast: AST): void {
    this.traverseNode(ast)
  }
}
