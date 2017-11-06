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
            enter(node, parentNode) {
              visitor[nodeType](node, parentNode)
            }
          }
        }

        if (!combinedVisitors.hasOwnProperty(nodeType)) {
          combinedVisitors[nodeType] = normalizedVisitor
        } else {
          const { enter, exit } = combinedVisitors[nodeType]

          combinedVisitors[nodeType] = {
            enter(node, parentNode) {
              if (enter) {
                enter(node, parentNode)
              }

              if (normalizedVisitor.enter) {
                normalizedVisitor.enter(node, parentNode)
              }
            },
            exit(node, parentNode) {
              if (exit) {
                exit(node, parentNode)
              }

              if (normalizedVisitor.exit) {
                normalizedVisitor.exit(node, parentNode)
              }
            }
          }
        }
      })
      return combinedVisitors
    },
    {}
  )
}
