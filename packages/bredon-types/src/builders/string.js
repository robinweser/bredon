/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

type Quote = '"' | "'"

export default function string(string: string, quote: Quote): SimpleNode {
  return {
    type: 'String',
    value: string,
    quote
  }
}
