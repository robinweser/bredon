/* @flow */
import combineVisitors from './utils/combineVisitors'
import createPath from './utils/createPath'

import type { ASTNode } from '../../../flowtypes/AST'
import type { Path } from '../../../flowtypes/Path'

export default class Traverser {
  visitors: Object
  context: Object

  constructor(visitors?: Array<Object> = [], context?: Object = {}) {
    this.visitors = combineVisitors(visitors)
    this.context = context
  }

  traverseNodeList(nodeList: Array<ASTNode>, parentPath: Path) {
    nodeList.forEach(childNode => this.traverseNode(childNode, parentPath))
  }

  traverseNode(node: ASTNode, parentPath: Path) {
    const methods = this.visitors[node.type]

    const nodePath = createPath(node, parentPath, this.context)

    if (methods && methods.enter) {
      methods.enter(nodePath)
    }

    switch (node.type) {
      case 'Value':
      case 'ValueList':
      case 'Expression':
        this.traverseNodeList(node.body, nodePath)
        break

      case 'FunctionExpression':
        this.traverseNodeList(node.params, nodePath)
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
      methods.exit(nodePath)
    }
  }

  traverse(ast: ASTNode): ASTNode {
    this.traverseNode(ast, createPath(ast, undefined, this.context))
    return ast
  }
}
