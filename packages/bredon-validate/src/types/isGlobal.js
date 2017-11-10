import { isIdentifier } from 'bredon-types'

export default function isGlobal(node) {
  return (
    isIdentifier(node) &&
    node.value.match(/^(initial|inherit|unset|revert)$/i) !== null
  )
}
