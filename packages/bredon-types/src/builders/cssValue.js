/* @flow */
import type { Node, CSSValue } from '../../../../flowtypes/AST'

export default function cssValue(body: Array<Node>): CSSValue {
  return {
    type: 'CSSValue',
    body
  }
}
