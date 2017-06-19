/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isStringLiteral(node: Node): boolean {
  return node.type === 'StringLiteral'
}
