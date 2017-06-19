/* @flow */
import type { IntegerNode, FloatNode } from '../../../../flowtypes/AST'

export default function float(integer: IntegerNode, fractional: IntegerNode): FloatNode {
  return {
    type: 'Float',
    fractional,
    integer
  }
}
