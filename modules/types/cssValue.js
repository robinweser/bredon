/* @flow */
import type { CSSValue, Node } from '../../flowtypes/AST'

export default function cssValue(body: Array<Node>): CSSValue {
  return {
    type: 'CSSValue',
    body
  }
}
