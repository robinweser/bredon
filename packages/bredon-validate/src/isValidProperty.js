/* @flow */
import { parse } from 'bredon'

import isValidPropertyValue from './isValidPropertyValue'

export default function isValidProperty(property: string, value: any): boolean {
  // if we do not know a property, we just skip it
  // and pretend its valid anyways
  // TODO: add valid property list
  if (false) {
    console.warn(
      `Unknown property: "${property}". If it is a valid CSS property, please file an issue.`
    )
    return true
  }

  return isValidPropertyValue(property, parse(value))
}
