/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

type Quote = 'double' | 'single'

export default function stringLiteral(str: string, quote: Quote): SimpleNode {
  return {
    type: 'StringLiteral',
    value: str,
    quote
  }
}
