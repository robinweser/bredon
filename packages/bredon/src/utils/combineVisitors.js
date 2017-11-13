/* @flow */
import * as bredon from '../index'

import arrayReduce from './arrayReduce'

export default function combineVisitors(
  visitors: Array<Object | Function>
): Object {
  return arrayReduce(
    visitors,
    (combinedVisitors, visitor) => {
      const resolvedVisitor =
        typeof visitor === 'function' ? visitor(bredon) : visitor

      Object.keys(resolvedVisitor).forEach(nodeType => {
        let normalizedVisitor = resolvedVisitor[nodeType]

        if (typeof normalizedVisitor === 'function') {
          normalizedVisitor = {
            enter(path) {
              resolvedVisitor[nodeType](path)
            },
          }
        }

        if (!combinedVisitors.hasOwnProperty(nodeType)) {
          combinedVisitors[nodeType] = normalizedVisitor
        } else {
          const { enter, exit } = combinedVisitors[nodeType]

          combinedVisitors[nodeType] = {
            enter(path) {
              if (enter) {
                enter(path)
              }

              if (normalizedVisitor.enter) {
                normalizedVisitor.enter(path)
              }
            },
            exit(path) {
              if (exit) {
                exit(path)
              }

              if (normalizedVisitor.exit) {
                normalizedVisitor.exit(path)
              }
            },
          }
        }
      })
      return combinedVisitors
    },
    {}
  )
}
