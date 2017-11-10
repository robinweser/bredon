/* @flow */
import type {
  ASTNode,
  ExpressionNode,
  FunctionNode,
  Value,
  ValueList,
} from '../../../flowtypes/AST'

export default function replaceChildNode(
  parentNode: ExpressionNode | FunctionNode | Value | ValueList,
  node: ASTNode,
  newNode: ASTNode
): void {
  const children = parentNode.body

  if (!children) {
    // TODO: warn cant replace child node in primitive nodes
  }

  parentNode.body[children.indexOf(node)] = newNode
}
