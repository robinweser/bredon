/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isCSSValue(node: Node): boolean {
  return node.type === 'CSSValue'
}
