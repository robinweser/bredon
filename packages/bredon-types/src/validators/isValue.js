/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isValue(node: ASTNode): boolean {
  return node.type === 'Value'
}
