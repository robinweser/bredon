/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isExpression(node: ASTNode): boolean {
  return node.type === 'Expression'
}
