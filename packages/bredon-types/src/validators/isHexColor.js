/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isHexColor(node: Node): boolean {
  return node.type === 'HexColor'
}
