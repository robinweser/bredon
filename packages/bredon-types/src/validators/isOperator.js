/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isOperator(node: ASTNode): boolean {
  return node.type === 'Operator'
}
