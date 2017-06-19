/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isIdentifier(node: ASTNode): boolean {
  return node.type === 'Identifier'
}
