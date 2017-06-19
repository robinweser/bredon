/* @flow */
import { traverse } from 'bredon'

import replaceNode from './replaceNode'
import isSingleValue from './isSingleValue'
import getSingleValue from './getSingleValue'

import type { ASTNode } from '../../../flowtypes/AST'

export default function wrap(node: ASTNode): Object {
  return {
    replaceWith(newNode: ASTNode): ASTNode {
      return replaceNode(node, newNode)
    },

    isSingleValue(): boolean {
      return isSingleValue(node)
    },

    getSingleValue() {
      return getSingleValue(node)
    },

    traverse(visitors: Object = {}) {
      travserse(node, visitors)
    }
  }
}
