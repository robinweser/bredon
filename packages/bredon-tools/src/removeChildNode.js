/* @flow */
import type {
  ASTNode,
  ExpressionNode,
  FunctionNode,
  Value,
  ValueList,
} from '../../../flowtypes/AST'

export default function removeChildNode(
  parentNode: ExpressionNode | FunctionNode | Value | ValueList,
  node: ASTNode
): void {
  const children = parentNode.body

  if (!children) {
    // TODO: warn cant replace child node in primitive nodes
  }

  parentNode.body = children.filter(childNode => childNode === node)
}
