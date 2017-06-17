/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isMultiValue(node: Node): boolean {
  return node.type === 'MultiValue'
}
