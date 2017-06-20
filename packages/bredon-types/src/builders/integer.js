/* @flow */
import type { IntegerNode } from '../../../../flowtypes/AST'

export default function integer(value: number): IntegerNode {
  return {
    type: 'Integer',
    value
  }
}
