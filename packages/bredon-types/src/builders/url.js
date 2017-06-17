/* @flow */
import type { SimpleNode } from '../../../../flowtypes/AST'

export default function url(url: string): SimpleNode {
  return {
    type: 'URL',
    value: url
  }
}
