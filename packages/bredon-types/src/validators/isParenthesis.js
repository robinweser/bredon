/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isParenthesis(node: ASTNode): boolean {
  return node.type === 'Parenthesis'
}
