/* @flow */
import type { Node, CSSValue } from '../../../../flowtypes/AST'

export default function multiValue(body: Array<Node>): CSSValue {
  return {
    type: 'MultiValue',
    body
  }
}
