import isLengthPercentage from './isLengthPercentage'
import matchesIdentifier from '../utils/matchesIdentifier'

export default function isSize(node, isMultiValue) {
  if (isMultiValue) {
    return (
      node.length === 2 &&
      isLengthPercentage(node[0]) &&
      matchesIdentifier(['border-box', 'content-box'])(node[1])
    )
  }

  return isLengthPercentage(node)
}
