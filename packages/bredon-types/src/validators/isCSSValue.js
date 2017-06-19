/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isCSSValue(node: ASTNode): boolean {
  return node.type === 'CSSValue'
}
