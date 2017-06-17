/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isString(node: Node): boolean {
  return node.type === 'String'
}
