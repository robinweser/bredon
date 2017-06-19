/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isFloatingPointNumber(node: ASTNode): boolean {
  return node.type === 'FloatingPointNumber'
}
