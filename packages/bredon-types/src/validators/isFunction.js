/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isFunction(node: Node): boolean {
  return node.type === 'Function'
}
