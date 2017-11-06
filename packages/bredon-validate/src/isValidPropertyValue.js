/* @flow */
import { isMultiValue, isCSSValue, isKeyword } from 'bredon-types'

import isMultiValueProperty from './isMultiValueProperty'
import isValueSetProperty from './isValueSetProperty'

import arrayReduce from './arrayReduce'

export default function isValidPropertyValue(
  property: string,
  ast: any,
  validator: Function
): boolean {
  if (isMultiValue(ast)) {
    if (!isMultiValueProperty(property)) {
      // TODO: invalid warning
      return false
    }

    return arrayReduce(
      ast.body,
      // the property is invalid as soon as one value is invalid
      // TODO: do not regenerate the value
      (isValid, cssValue) =>
        isValid && isValidPropertyValue(property, cssValue, validator),
      true
    )
  }

  if (isCSSValue(ast)) {
    const valueCount = ast.body.length

    if (valueCount > 1) {
      if (!isValueSetProperty(property)) {
        // TODO: invalid warning
        return false
      }

      return validator(ast.body, true)
    }

    const node = ast.body[0]
    // keyword values are always valid
    return isKeyword(node) || validator(node)
  }

  // TODO: true or false?
  return true
}
