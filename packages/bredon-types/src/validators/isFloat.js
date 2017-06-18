/* @flow */
import type { Node } from '../../../../flowtypes/AST'

export default function isFloat(node: Node): boolean {
  return node.type === 'Float'
}
