/* @flow */
import type { ASTNode } from '../../../flowtypes/AST'

export default function replaceNode(node: ASTNode, newNode: ASTNode): ASTNode {
  node = { ...newNode }
  return newNode
}
