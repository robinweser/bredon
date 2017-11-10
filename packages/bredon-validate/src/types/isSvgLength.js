import isLength from './isLength'
import isNumber from './isNumber'
import isPercentage from './isPercentage'

export default function isSvgLength(node) {
  return isLength(node) || isPercentage(node) || isNumber(node)
}
