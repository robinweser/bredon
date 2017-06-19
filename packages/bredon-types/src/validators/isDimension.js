/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isDimension(node: ASTNode): boolean {
  return node.type === 'Dimension'
}
