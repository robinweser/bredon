/* @flow */
import { parse } from 'bredon'

import isValidProperty from './isValidProperty'

export default function validate(property: string, value: string): boolean {
  return isValidProperty(property, parse(value))
}
