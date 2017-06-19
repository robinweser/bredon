/* @flow */
import type { FloatNode } from '../../../../flowtypes/AST'

export default function float(
  integer: number,
  fractional: number,
  isNegative?: boolean = false
): FloatNode {
  const node: FloatNode = {
    type: 'Float',
    integer,
    fractional
  }

  if (isNegative) {
    node.negative = true
  }

  return node
}
