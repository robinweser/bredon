/* @flow */
import type { FloatNode } from '../../../../flowtypes/AST'

export default function float(
  integer: number,
  fractional: number,
  isNegative?: boolean = false
): FloatNode {
  return {
    type: 'Float',
    fractional,
    integer,
    negative: isNegative,
  }
}
