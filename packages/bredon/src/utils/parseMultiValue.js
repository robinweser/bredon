/* @flow */
import type { Node, CSSValue } from '../../flowtypes/AST'

import arrayReduce from './arrayReduce'

export default function parseMultiValue(nodes: Array<Node>): Array<CSSValue> {
  return arrayReduce(
    nodes,
    (values, node) => {
      if (node.type === 'Separator') {
        values.push({
          type: 'CSSValue',
          body: []
        })
      } else {
        values[values.length - 1].body.push(node)
      }

      return values
    },
    [
      {
        type: 'CSSValue',
        body: []
      }
    ]
  )
}
