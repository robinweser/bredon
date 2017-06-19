/* @flow */
import type { MultiValue, CSSValue } from '../../../../flowtypes/AST'

export default function multiValue(body: Array<CSSValue>): MultiValue {
  return {
    type: 'MultiValue',
    body
  }
}
