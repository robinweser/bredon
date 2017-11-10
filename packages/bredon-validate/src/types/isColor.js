import { isHexColor, isIdentifier, isFunctionExpression } from 'bredon-types'

import colorNames from '../data/colorNames'

const COLOR_REGEX = /^(rgba?|hsla?)$/

// TODO: validation
export default function isColor(node) {
  return (
    // matches hex color values
    isHexColor(node) ||
    // matches rgb, rgba, hsl, hsla color functions
    (isFunctionExpression(node) && node.callee.match(COLOR_REGEX) !== null) ||
    // matches any color name
    (isIdentifier(node) && colorNames.indexOf(node.value) !== -1)
  )
}
