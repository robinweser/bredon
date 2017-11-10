/* @flow */
import type { IntegerNode } from '../../../../flowtypes/AST'

export default function integer(
  value: number,
  isNegative?: boolean = false
): IntegerNode {
  return {
    type: 'Integer',
    negative: isNegative,
    value,
  }
}
