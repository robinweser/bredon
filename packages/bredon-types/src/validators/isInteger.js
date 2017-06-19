/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isInteger(node: ASTNode): boolean {
  return node.type === 'Integer'
}
