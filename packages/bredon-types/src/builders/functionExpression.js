/* @flow */
import type { Node, FunctionNode } from '../../../../flowtypes/AST'

export default function functionExpression(
  callee: Node,
  params: Array<Node>
): FunctionNode {
  return {
    type: 'Function',
    callee,
    params
  }
}
