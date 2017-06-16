/* @flow */
import type { SimpleNode } from '../../flowtypes/AST'

export default function integer(value: number): SimpleNode {
  return {
    type: 'Integer',
    value
  }
}
