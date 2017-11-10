/* @flow */
import type { ValueList, Value } from '../../../../flowtypes/AST'

export default function valueList(body: Array<Value> = []): ValueList {
  return {
    type: 'ValueList',
    body,
  }
}
