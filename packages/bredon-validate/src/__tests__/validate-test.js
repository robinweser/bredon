import validate from '../index'

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
    expect(validate('paddingLeft', '2px')).toBe(true)
    expect(validate('paddingLeft', '2px!important')).toBe(true)
    expect(validate('paddingLeft', '2px !important')).toBe(true)
    expect(validate('paddingLeft', '100%')).toBe(true)
    expect(validate('paddingLeft', 'red')).toBe(false)
    expect(validate('paddingLeft', '2px 2px')).toBe(false)
    expect(validate('paddingLeft', '2px, 2px')).toBe(false)
    expect(validate('blockSize', '2px')).toBe(true)
    expect(validate('blockSize', 'inherit')).toBe(true)
    expect(validate('blockSize', '2px border-box')).toBe(true)
    expect(validate('blockSize', '2px available')).toBe(false)
    expect(validate('strokeDasharray', 'none')).toBe(true)
    expect(validate('strokeDasharray', '2px 10%')).toBe(true)
    expect(validate('strokeDasharray', 'none 2px')).toBe(false)
    expect(validate('strokeDasharray', '2px none')).toBe(false)

    expect(validate('borderLeft', '2px')).toBe(true)
    expect(validate('borderLeft', 'solid')).toBe(true)
    expect(validate('borderLeft', '2px solid')).toBe(true)
    expect(validate('borderLeft', 'solid 2px')).toBe(true)
    expect(validate('borderLeft', 'red solid 2px')).toBe(true)
    expect(validate('borderLeft', 'solid 2px red')).toBe(true)
    expect(validate('borderLeft', 'solid red')).toBe(true)
    expect(validate('borderLeft', 'solid 2px red 2px')).toBe(false)
    expect(validate('borderLeft', 'solid solid')).toBe(false)

    expect(validate('touchAction', 'none')).toBe(true)
    expect(validate('touchAction', 'pan-x')).toBe(true)
    expect(validate('touchAction', 'pan-y pan-x')).toBe(true)
    expect(validate('touchAction', 'pinch-zoom pan-x pan-y')).toBe(true)
    expect(validate('touchAction', 'pinch-zoom pan-x pan-y pan-x')).toBe(false)
    expect(validate('touchAction', 'none none')).toBe(false)
    expect(validate('touchAction', 'none pan-x')).toBe(false)
    expect(validate('touchAction', 'pan-x none')).toBe(false)
    expect(validate('touchAction', 'pan-x pan-x')).toBe(false)

    expect(validate('willChange', 'auto')).toBe(true)
    expect(validate('willChange', 'scroll-position, contents')).toBe(true)
    expect(validate('willChange', 'auto, auto')).toBe(false)
    expect(validate('willChange', 'auto, scroll-position')).toBe(false)
    expect(validate('scrollSnapCoordinate', 'none')).toBe(true)
    expect(validate('scrollSnapCoordinate', 'none, none')).toBe(false)
    expect(validate('scrollSnapCoordinate', '30px')).toBe(true)
    expect(validate('scrollSnapCoordinate', '40px, left')).toBe(true)

    expect(validate('WebkitMaskAttachment', 'scroll')).toBe(true)
    expect(validate('WebkitMaskAttachment', 'scroll, fixed')).toBe(true)
    expect(
      validate('WebkitMaskAttachment', 'scroll, fixed, scroll, local')
    ).toBe(true)
    expect(validate('WebkitMaskAttachment', 'scroll, fixed, 2px, local')).toBe(
      false
    )
    expect(validate('WebkitMaskAttachment', 'scroll fixed')).toBe(false)
  })
})
