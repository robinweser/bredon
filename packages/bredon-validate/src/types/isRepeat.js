import { isFunctionExpression } from 'bredon-types'

import isLengthPercentage from './isLengthPercentage'

export default function isRepeat(node) {
  return (
    isFunctionExpression(node) &&
    node.callee === 'repeat' &&
    node.params.length === 1 &&
    isLengthPercentage(node.params[0])
  )
}
