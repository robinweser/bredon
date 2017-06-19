/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isHexColor(node: ASTNode): boolean {
  return node.type === 'HexColor'
}
