/* @flow */
import type { Node, Value } from '../../../../flowtypes/AST'

export default function cssValue(
  body: Array<Node> = [],
  important: ?boolean = false
): Value {
  return {
    type: 'Value',
    important,
    multi: body.length > 1,
    body,
  }
}
