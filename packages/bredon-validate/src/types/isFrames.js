import { isFunctionExpression } from 'bredon-types'

export default function isFrames(node) {
  return (
    isFunctionExpression(node) &&
    node.callee === 'frames' &&
    node.params.length === 1 &&
    isInteger(node.params[0])
  )
}
