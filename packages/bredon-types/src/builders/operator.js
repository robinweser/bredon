/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

type ExpressionSymbol = '+' | '-' | '*' | '/'

export default function operator(symbol: ExpressionSymbol): SimpleNode {
  return {
    type: 'Operator',
    value: symbol,
  }
}
