/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isOperator(node: Node): boolean {
  return node.type === 'Operator'
}
