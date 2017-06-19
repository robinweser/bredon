/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isFunctionExpression(node: ASTNode): boolean {
  return node.type === 'FunctionExpression'
}
