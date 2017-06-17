/* @flow */
import type { AST, CSSValue } from '../../../../flowtypes/AST'

export default function multiValue(values: Array<CSSValue>): AST {
  return {
    type: 'MultiValue',
    values
  }
}
