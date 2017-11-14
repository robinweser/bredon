/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isAssignment(node: ASTNode): boolean {
  return node.type === 'Assignment'
}
