/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

export default function identifier(value: string): SimpleNode {
  return {
    type: 'Identifier',
    value
  }
}
