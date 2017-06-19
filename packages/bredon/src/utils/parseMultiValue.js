/* @flow */
import { isSeparator, cssValue } from 'bredon-types'

import arrayReduce from './arrayReduce'

import type { CSSValue, Node } from '../../../../flowtypes/AST'

export default function parseMultiValue(nodes: Array<Node>): Array<CSSValue> {
  return arrayReduce(
    nodes,
    (values, node) => {
      if (isSeparator(node)) {
        values.push(cssValue([]))
      } else {
        values[values.length - 1].body.push(node)
      }

      return values
    },
    [cssValue([])]
  )
}
