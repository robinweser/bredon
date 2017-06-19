/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isKeyword(node: ASTNode): boolean {
  return node.type === 'Keyword'
}
