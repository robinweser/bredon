/* @flow */
import arrayReduce from './arrayReduce'

export default function combineVisitors(visitors: Array<Object>): Object {
  return arrayReduce(
    visitors,
    (combinedVisitors, visitor) => {
      Object.keys(visitor).forEach(nodeType => {
        let normalizedVisitor = visitor[nodeType]

        if (typeof normalizedVisitor === 'function') {
          normalizedVisitor = {
            enter(path, bredon) {
              visitor[nodeType](path, bredon)
            },
          }
        }

        if (!combinedVisitors.hasOwnProperty(nodeType)) {
          combinedVisitors[nodeType] = normalizedVisitor
        } else {
          const { enter, exit } = combinedVisitors[nodeType]

          combinedVisitors[nodeType] = {
            enter(path, bredon) {
              if (enter) {
                enter(path, bredon)
              }

              if (normalizedVisitor.enter) {
                normalizedVisitor.enter(path, bredon)
              }
            },
            exit(path, bredon) {
              if (exit) {
                exit(path, bredon)
              }

              if (normalizedVisitor.exit) {
                normalizedVisitor.exit(path, bredon)
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
