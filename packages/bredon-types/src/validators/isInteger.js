/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isInteger(node: Node): boolean {
  return node.type === 'Integer'
}
