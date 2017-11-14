import { isDimension, isInteger, isFunctionExpression } from 'bredon-types'

export default function isLength(node) {
  return (
    // all dimensional values are length values
    (isDimension(node) &&
      node.unit.match(
        /^(em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|q|in|pt|pc|px|dpi|dpcm|dppx)$/i
      ) !== null) ||
    // 0 doesn't require a unit
    (isInteger(node) && node.value === 0) ||
    // calc() functions are length values as well
    (isFunctionExpression(node) && node.callee.indexOf('calc') !== -1)
  )
}
