import { isFunctionExpression } from 'bredon-types'

import isNumber from './isNumber'
import validateNodeList from '../utils/validateNodeList'

export default function isCubicBezier(node) {
  return (
    isFunctionExpression(node) &&
    node.callee === 'cubic-bezier' &&
    node.params.length === 4 &&
    validateNodeList(isNumber)(node.params)
  )
}
