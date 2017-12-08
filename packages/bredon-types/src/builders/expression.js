/* @flow */
import type { ExpressionNode, Node } from '../../../../flowtypes/AST'

export default function expression(body: Array<Node>): ExpressionNode {
  return {
    type: 'Expression',
    body,
  }
}
