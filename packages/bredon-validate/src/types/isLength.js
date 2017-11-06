/* @flow */
import { isDimension, isInteger, isFunctionExpression } from 'bredon-types'

export default function isLength(node: any): boolean {
  return (
    // all dimensional values are length values
    isDimension(node) ||
    // 0 doesn't require a unit
    (isInteger(node) && node.value === 0) ||
    // calc() functions are length values as well
    (isFunctionExpression(node) && node.callee.value.indexOf('calc') !== -1)
  )
}
