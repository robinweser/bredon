/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isUrl(node: Node): boolean {
  return node.type === 'Expression'
}
