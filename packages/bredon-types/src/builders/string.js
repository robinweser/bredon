/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

type Quote = '"' | "'"

export default function string(str: string, quote: Quote): SimpleNode {
  return {
    type: 'String',
    value: str,
    quote
  }
}
