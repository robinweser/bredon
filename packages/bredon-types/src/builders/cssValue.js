/* @flow */
import type { Node, CSSValue } from '../../../../flowtypes/AST'

export default function cssValue(
  body: Array<Node>,
  important: ?boolean = false
): CSSValue {
  return {
    type: 'CSSValue',
    important,
    body
  }
}
