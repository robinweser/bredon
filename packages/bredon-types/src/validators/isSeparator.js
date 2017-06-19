/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isSeparator(node: ASTNode): boolean {
  return node.type === 'Separator'
}
