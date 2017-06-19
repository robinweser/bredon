/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isStringLiteral(node: ASTNode): boolean {
  return node.type === 'StringLiteral'
}
