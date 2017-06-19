/* @flow */
import type { FloatASTNode } from '../../../../flowtypes/AST'

export default function floatingPointNumber(
  integer: number,
  fractional: number
): FloatASTNode {
  return {
    type: 'FloatingPointNumber',
    integer,
    fractional
  }
}
