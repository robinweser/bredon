/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isMultiValue(node: ASTNode): boolean {
  return node.type === 'MultiValue'
}
