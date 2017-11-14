/* @flow */
import normalizeVisitors from './utils/normalizeVisitors'
import createPath from './utils/createPath'

import type { ASTNode } from '../../../flowtypes/AST'
import type { Path } from '../../../flowtypes/Path'

export default class Traverser {
  visitors: Object
  context: Object

  constructor(visitors?: Array<Object> = [], context?: Object = {}) {
    this.visitors = normalizeVisitors(visitors)
    this.context = context
  }

  traverseNodeList(
    visitor: Object,
    nodeList: Array<ASTNode>,
    parentPath: Path
  ) {
    nodeList.forEach(childNode =>
      this.traverseNode(visitor, childNode, parentPath)
    )
  }

  traverseNode(visitor: Object, node: ASTNode, parentPath: Path) {
    const methods = visitor[node.type]

    const nodePath = createPath(node, parentPath, this.context)

    if (methods && methods.enter) {
      methods.enter(nodePath)
    }

    switch (node.type) {
      case 'Value':
      case 'ValueList':
      case 'Expression':
        this.traverseNodeList(visitor, node.body, nodePath)
        break

      case 'FunctionExpression':
        this.traverseNodeList(visitor, node.params, nodePath)
        break

      case 'Dimension':
      case 'Assignment':
        this.traverseNode(visitor, node.value, nodePath)
        break

      case 'Integer':
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
    this.visitors.forEach(visitor =>
      this.traverseNode(visitor, ast, createPath(ast, undefined, this.context))
    )
    return ast
  }
}
