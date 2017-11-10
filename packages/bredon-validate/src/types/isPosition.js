import isLengthPercentage from './isLengthPercentage'
import matchesIdentifier from '../utils/matchesIdentifier'

export default function isPosition(node, isMultiValue) {
  if (isMultiValue) {
    return (
      (node.length === 2 &&
        (((isLengthPercentage(node[0]) ||
          matchesIdentifier(['left', 'center', 'right'])(node[0])) &&
          (isLengthPercentage(node[1]) ||
            matchesIdentifier(['top', 'center', 'bottom'])(node[1]))) ||
          (matchesIdentifier(['center', 'left', 'right'])(node[0]) &&
            matchesIdentifier(['center', 'top', 'bottom'])(node[1])))) ||
      ((node.length === 3 &&
        (matchesIdentifier(['center', 'left', 'right'])(node[0]) &&
          matchesIdentifier(['top', 'bottom'])(node[1]) &&
          isLengthPercentage(node[2]))) ||
        (matchesIdentifier(['left', 'right'])(node[0]) &&
          isLengthPercentage(node[1]) &&
          matchesIdentifier(['top', 'bottom', 'center'])(node[2]))) ||
      (node.length === 4 &&
        (matchesIdentifier(['left', 'right'])(node[0]) &&
          isLengthPercentage(node[1]) &&
          matchesIdentifier(['top', 'bottom'])(node[2]) &&
          isLengthPercentage(node[3])))
    )
  }

  return (
    isLengthPercentage(node) ||
    matchesIdentifier(['left', 'center', 'right', 'top', 'bottom'])(node)
  )
}
