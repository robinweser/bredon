/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

export default function separator(kind: string = '/'): SimpleNode {
  return {
    type: 'Separator',
    value: kind
  }
}
