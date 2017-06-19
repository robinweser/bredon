/* @flow */
import type { IntegerNode } from '../../../../flowtypes/AST'

export default function integer(
  value: number,
  isNegative?: boolean = false
): IntegerNode {
  const node: IntegerNode = {
    type: 'Integer',
    value
  }

  if (isNegative) {
    node.negative = true
  }

  return node
}
