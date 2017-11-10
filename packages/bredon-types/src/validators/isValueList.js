/* @flow */
import type { ASTNode } from '../../../../flowtypes/AST'

export default function isValueList(node: ASTNode): boolean {
  return node.type === 'ValueList'
}
