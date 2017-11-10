import isLength from './isLength'
import matchesIdentifier from '../utils/matchesIdentifier'

export default function isSize(node, isMultiValue) {
  if (isMultiValue) {
    return (
      node.length === 2 &&
      isLength(node[0]) &&
      matchesIdentifier(['border-box', 'content-box'])(node[1])
    )
  }

  return isLength(node)
}
