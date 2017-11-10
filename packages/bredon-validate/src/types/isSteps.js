import { isFunctionExpression, isInteger } from 'bredon-types'

import matchesIdentifier from '../utils/matchesIdentifier'

export default function isSteps(node) {
  return (
    isFunctionExpression(node) &&
    node.callee === 'steps' &&
    ((node.params.length === 1 && isInteger(node.params[0])) ||
      (node.params.length === 2 &&
        isInteger(node.params[0]) &&
        matchesIdentifier(['start', 'end'])(node.params[1])))
  )
}
