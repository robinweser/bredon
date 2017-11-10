import isValidProperty from '../isValidProperty'

/* eslint-disable */
import mdnData from '../data/__mdnData'
import propertyValidators from '../propertyValidators'

import properties from '../data/properties'

const dashRegex = /-([a-z])/g
const msRegex = /^Ms/g

function camelCaseProperty(property) {
  return property
    .replace(dashRegex, match => match[1].toUpperCase())
    .replace(msRegex, 'ms')
}

var uppercasePattern = /[A-Z]/g
var msPattern = /^ms-/
var cache = {}

function hyphenateStyleName(string) {
  return string in cache
    ? cache[string]
    : (cache[string] = string
        .replace(uppercasePattern, '-$&')
        .toLowerCase()
        .replace(msPattern, '-ms-'))
}

const additional = Object.keys(properties).filter(
  prop => !mdnData.hasOwnProperty(hyphenateStyleName(prop))
)

additional.forEach(prop => {
  mdnData[prop] = true
})

console.log(
  `Missing properties:
${Object.keys(mdnData)
    .filter(prop => !properties.hasOwnProperty(camelCaseProperty(prop)))
    .map(camelCaseProperty)
    .join('\n')}

Having ${Object.keys(properties).length} out of ${Object.keys(mdnData)
    .length} properties.
Progress: ${Math.round(
    Object.keys(properties).length / Object.keys(mdnData).length * 10000
  ) / 100}% done.`
)

/* eslint-enable */

describe('Validating properties', () => {
  it('should correctly validate property values', () => {
    expect(isValidProperty('paddingLeft', '2px')).toBe(true)
    expect(isValidProperty('paddingLeft', '2px!important')).toBe(true)
    expect(isValidProperty('paddingLeft', '2px !important')).toBe(true)
    expect(isValidProperty('paddingLeft', '100%')).toBe(true)
    expect(isValidProperty('paddingLeft', 'red')).toBe(false)
    expect(isValidProperty('paddingLeft', '2px 2px')).toBe(false)
    expect(isValidProperty('paddingLeft', '2px, 2px')).toBe(false)
    expect(isValidProperty('blockSize', '2px')).toBe(true)
    expect(isValidProperty('blockSize', 'inherit')).toBe(true)
    expect(isValidProperty('blockSize', '2px border-box')).toBe(true)
    expect(isValidProperty('blockSize', '2px available')).toBe(false)
    expect(isValidProperty('strokeDasharray', 'none')).toBe(true)
    expect(isValidProperty('strokeDasharray', '2px 10%')).toBe(true)
    expect(isValidProperty('strokeDasharray', 'none 2px')).toBe(false)
    expect(isValidProperty('strokeDasharray', '2px none')).toBe(false)

    expect(isValidProperty('borderLeft', '2px')).toBe(true)
    expect(isValidProperty('borderLeft', 'solid')).toBe(true)
    expect(isValidProperty('borderLeft', '2px solid')).toBe(true)
    expect(isValidProperty('borderLeft', 'solid 2px')).toBe(true)
    expect(isValidProperty('borderLeft', 'red solid 2px')).toBe(true)
    expect(isValidProperty('borderLeft', 'solid 2px red')).toBe(true)
    expect(isValidProperty('borderLeft', 'solid red')).toBe(true)
    expect(isValidProperty('borderLeft', 'solid 2px red 2px')).toBe(false)
    expect(isValidProperty('borderLeft', 'solid solid')).toBe(false)

    expect(isValidProperty('touchAction', 'none')).toBe(true)
    expect(isValidProperty('touchAction', 'pan-x')).toBe(true)
    expect(isValidProperty('touchAction', 'pan-y pan-x')).toBe(true)
    expect(isValidProperty('touchAction', 'pinch-zoom pan-x pan-y')).toBe(true)
    expect(isValidProperty('touchAction', 'pinch-zoom pan-x pan-y pan-x')).toBe(
      false
    )
    expect(isValidProperty('touchAction', 'none none')).toBe(false)
    expect(isValidProperty('touchAction', 'none pan-x')).toBe(false)
    expect(isValidProperty('touchAction', 'pan-x none')).toBe(false)
    expect(isValidProperty('touchAction', 'pan-x pan-x')).toBe(false)

    expect(isValidProperty('willChange', 'auto')).toBe(true)
    expect(isValidProperty('willChange', 'scroll-position, contents')).toBe(
      true
    )
    expect(isValidProperty('willChange', 'auto, auto')).toBe(false)
    expect(isValidProperty('willChange', 'auto, scroll-position')).toBe(false)
    expect(isValidProperty('scrollSnapCoordinate', 'none')).toBe(true)
    expect(isValidProperty('scrollSnapCoordinate', 'none, none')).toBe(false)
    expect(isValidProperty('scrollSnapCoordinate', '30px')).toBe(true)
    expect(isValidProperty('scrollSnapCoordinate', '40px, left')).toBe(true)

    expect(isValidProperty('WebkitMaskAttachment', 'scroll')).toBe(true)
    expect(isValidProperty('WebkitMaskAttachment', 'scroll, fixed')).toBe(true)
    expect(
      isValidProperty('WebkitMaskAttachment', 'scroll, fixed, scroll, local')
    ).toBe(true)
    expect(
      isValidProperty('WebkitMaskAttachment', 'scroll, fixed, 2px, local')
    ).toBe(false)
    expect(isValidProperty('WebkitMaskAttachment', 'scroll fixed')).toBe(false)
  })
})
