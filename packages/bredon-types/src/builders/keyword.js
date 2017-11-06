/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

type Keyword = 'initial' | 'inherit' | 'unset' | 'revert'

export default function keyword(value: Keyword): SimpleNode {
  return {
    type: 'Keyword',
    value
  }
}
