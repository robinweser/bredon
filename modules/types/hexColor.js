/* @flow */
import type { SimpleNode } from '../../flowtypes/AST'

export default function hexColor(color: string): SimpleNode {
  return {
    type: 'HexColor',
    value: color
  }
}
