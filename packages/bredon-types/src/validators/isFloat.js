/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isFloat(node: ASTNode): boolean {
  return node.type === 'Float'
}
