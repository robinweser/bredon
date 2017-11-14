/* @flow */
import { parse, traverse } from 'bredon'
import casePlugin from 'bredon-plugin-case'

import isValidProperty from './isValidProperty'

export default function validate(property: string, value: string): boolean {
  return isValidProperty(property, traverse(parse(value), [casePlugin()]))
}
