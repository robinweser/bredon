/* @flow */
import type { FloatNode } from '../../flowtypes/AST'

export default function float(integer: number, fractional: number): FloatNode {
  return {
    type: 'Float',
    integer,
    fractional
  }
}
