/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

export default function url(str: string): SimpleNode {
  return {
    type: 'URL',
    value: str
  }
}
