/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isIdentifier(node: Node): boolean {
  return node.type === 'Identifier'
}
