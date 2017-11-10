import { isInteger, isFloat } from 'bredon-types'

export default function isNumber(node) {
  return isFloat(node) || isInteger(node)
}
