/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isKeyword(node: Node): boolean {
  return node.type === 'Keyword'
}
