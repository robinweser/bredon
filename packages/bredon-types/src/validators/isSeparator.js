/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isSeparator(node: Node): boolean {
  return node.type === 'Separator'
}
