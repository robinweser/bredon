/* @flow */
import type { Node, AssignmentNode } from '../../../../flowtypes/AST'

export default function assignment(name: string, value: Node): AssignmentNode {
  return {
    type: 'Assignment',
    name,
    value,
  }
}
