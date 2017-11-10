/* @flow */
import combineVisitors from './utils/combineVisitors'

import type { AST, ASTNode } from '../../../flowtypes/AST'

export default class Traverser {
  visitors: Object

  constructor(visitors?: Array<Object> = []) {
    this.visitors = combineVisitors(visitors)
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
      case 'Value':
      case 'ValueList':
      case 'Expression':
        this.traverseNodeList(node.body, node)
        break

      case 'FunctionExpression':
        this.traverseNodeList(node.params, node)
        break

      case 'Integer':
      case 'Dimension':
      case 'Float':
      case 'Identifier':
      case 'Operator':
      case 'Separator':
      case 'HexColor':
      case 'StringLiteral':
      case 'URL':
        break

      default:
        throw new TypeError(`Unkown Type ${node.type}`)
    }

    if (methods && methods.exit) {
      methods.exit(node, parentNode)
    }
  }

  traverse(ast: AST): AST {
    this.traverseNode(ast)
    return ast
  }
}
