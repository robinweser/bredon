/* @flow */
import type { AST, CSSValue } from '../../flowtypes/AST'

export default function multiValue(body: Array<CSSValue>): AST {
  return {
    type: 'MultiValue',
    body
  }
}
