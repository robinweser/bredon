import isLength from './isLength'
import isPercentage from './isPercentage'

export default function isLengthPercentage(node) {
  return isLength(node) || isPercentage(node)
}
