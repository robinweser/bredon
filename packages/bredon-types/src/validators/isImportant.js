/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isImportant(node: ASTNode): boolean {
  return node.type === 'Important'
}
