/* @flow */
import type { IntegerNode, FloatNode } from '../../../../flowtypes/AST'

export default function float(
  integer: IntegerNode,
  fractional: IntegerNode
): FloatNode {
  const node: FloatNode = {
    type: 'Float',
    fractional
  }

  if (integer.negative || integer.value !== 0) {
    node.integer = integer
  }

  return node
}
