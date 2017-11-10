/* @flow */
import { traverse } from 'bredon'

import replaceNode from './replaceNode'
import replaceChildNode from './replaceChildNode'
import removeChildNode from './removeChildNode'
import isSingleValue from './isSingleValue'
import getSingleValue from './getSingleValue'

import type { ASTNode } from '../../../flowtypes/AST'

export default function wrap(node: ASTNode): Object {
  return {
    replaceWith(newNode: ASTNode): void {
      replaceNode(node, newNode)
    },

    replaceChildNode(childNode: ASTNode, newNode: ASTNode): void {
      replaceChildNode(node, childNode, newNode)
    },

    removeChildNode(childNode: ASTNode): void {
      removeChildNode(node, childNode)
    },

    isSingleValue(): boolean {
      return isSingleValue(node)
    },

    getSingleValue() {
      return getSingleValue(node)
    },

    traverse(visitors?: Array<Object>) {
      traverse(node, visitors)
    },
  }
}
