/* @flow */
import * as bredon from '../index'

import arrayReduce from './arrayReduce'

export default function normalizeVisitors(
  visitors: Array<Object | Function>
): Object {
  return arrayReduce(
    visitors,
    (normalizedVisitors, visitor) => {
      const resolvedVisitor =
        typeof visitor === 'function' ? visitor(bredon) : visitor

      Object.keys(resolvedVisitor).forEach(nodeType => {
        const normalizedVisitor = resolvedVisitor[nodeType]

        if (typeof normalizedVisitor === 'function') {
          resolvedVisitor[nodeType] = {
            enter(path) {
              normalizedVisitor(path)
            },
          }
        }
      })

      normalizedVisitors.push(resolvedVisitor)
      return normalizedVisitors
    },
    []
  )
}
