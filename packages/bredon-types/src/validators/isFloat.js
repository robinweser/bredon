/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isExpression(node: Node): boolean {
  return node.type === 'Expression'
}
