/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isDimension(node: Node): boolean {
  return node.type === 'Dimension'
}
