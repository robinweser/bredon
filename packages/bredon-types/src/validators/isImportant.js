/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isImportant(node: Node): boolean {
  return node.type === 'Important'
}
