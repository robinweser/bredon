/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

type Paren = '(' | ')'
export default function parenthesis(paren: Paren): SimpleNode {
  return {
    type: 'Parenthesis',
    value: paren,
  }
}
