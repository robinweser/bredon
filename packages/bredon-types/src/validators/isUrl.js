/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isUrl(node: ASTNode): boolean {
  return node.type === 'Expression'
}
