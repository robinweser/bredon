import isValidProperty from '../isValidProperty'

import mdnData from '../data/__mdnData'
import propertyValidators from '../propertyValidators'

const dashRegex = /-([a-z])/g
const msRegex = /^Ms/g

function camelCaseProperty(property) {
  return property
    .replace(dashRegex, match => match[1].toUpperCase())
    .replace(msRegex, 'ms')
}

console.log(
  `Missing properties:
${Object.keys(mdnData)
    .filter(prop => !propertyValidators.hasOwnProperty(camelCaseProperty(prop)))
    .join('\n')}

Having ${Object.keys(propertyValidators).length} out of ${Object.keys(mdnData)
    .length} (${Object.keys(mdnData).length -
    Object.keys(mdnData).filter(
      prop => prop.match(/-webkit-|-moz-|-ms-/) !== null
    ).length}) properties.
Progress: ${Math.round(
    Object.keys(propertyValidators).length / Object.keys(mdnData).length * 10000
  ) / 100}% (${Math.round(
    Object.keys(propertyValidators).length /
      Object.keys(mdnData).filter(
        prop => prop.match(/-webkit-|-moz-|-ms-/) === null
      ).length *
      10000
  ) / 100}%) done.`
)

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
    expect(isValidProperty('blockSize', '2px border-box')).toBe(true)
    expect(isValidProperty('blockSize', '2px available')).toBe(false)
  })

  it('should throw a warning', () => {
    global.console = { warn: jest.fn() }
    expect(isValidProperty('paddingLeftRight', '2px'))
    expect(console.warn).toBeCalled()
  })
})