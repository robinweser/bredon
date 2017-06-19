/* @flow */
import type { MultiValue, CSSValue } from '../../../../flowtypes/AST'

export default function multiValue(values: Array<CSSValue>): MultiValue {
  return {
    type: 'MultiValue',
    values
  }
}
