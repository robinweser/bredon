import { isIdentifier } from 'bredon-types'

const GLOBAL_REGEX = /^(initial|inherit|unset|revert)$/i

export default function isGlobal(node) {
  return isIdentifier(node) && node.value.match(GLOBAL_REGEX) !== null
}
