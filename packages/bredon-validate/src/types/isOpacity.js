import { isInteger, isFloat } from 'bredon-types'

export default function isOpacity(node) {
  return (
    (isInteger(node) && (node.value === 1 || node.value === 0)) ||
    (isFloat(node) &&
      ((node.integer < 1 && node.integer >= 0 && !node.negative) ||
        (node.integer === 1 && node.fractional === 0 && !node.negative)))
  )
}
