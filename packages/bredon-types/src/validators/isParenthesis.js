/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isParenthesis(node: Node): boolean {
  return node.type === 'Parenthesis'
}