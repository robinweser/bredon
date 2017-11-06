/* @flow */
import { parse } from 'bredon'

import isValidPropertyValue from './isValidPropertyValue'
import propertyValidators from './propertyValidators'

export default function isValidProperty(property: string, value: any): boolean {
  const validator = propertyValidators[property]

  // if we do not know a property, we just skip it
  // and pretend its valid anyways
  if (!validator) {
    console.warn(
      `Unknown property: "${property}". If it is a valid CSS property, please file an issue.`
    )
    return true
  }

  return isValidPropertyValue(property, parse(value), validator)
}
