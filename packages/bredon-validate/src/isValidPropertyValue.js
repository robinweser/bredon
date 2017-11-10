/* @flow */
import { isValueList, isValue } from 'bredon-types'

import isValueListProperty from './utils/isValueListProperty'
import isMultiValueProperty from './utils/isMultiValueProperty'
import matchesKeyword from './utils/matchesKeyword'
import arrayReduce from './utils/arrayReduce'

import isGlobal from './types/isGlobal'

import propertyValidators from './propertyValidators'

const defaultValidator = () => false

export default function isValidPropertyValue(
  property: string,
  ast: any
): boolean {
  if (isValueList(ast)) {
    if (ast.body.length > 1 && !isValueListProperty(property)) {
      // TODO: invalid warning
      return false
    }

    return arrayReduce(
      ast.body,
      // the property is invalid as soon as one value is invalid
      // TODO: do not regenerate the value
      (isValid, cssValue) =>
        isValid && isValidPropertyValue(property, cssValue),
      true
    )
  }

  if (isValue(ast)) {
    const valueCount = ast.body.length
    const validator = propertyValidators[property] || defaultValidator

    if (valueCount > 1) {
      if (!isMultiValueProperty(property)) {
        // TODO: invalid warning
        return false
      }

      if (!validator) {
        // TODO: add warning
        return false
      }

      return validator(ast.body, true)
    }

    const node = ast.body[0]

    return (
      // global values are always valid
      isGlobal(node) ||
      // also check for any keyword value
      matchesKeyword(property)(node) ||
      // use the property validator
      validator(node)
    )
  }

  // TODO: true or false?
  // this branch can only be reached if the value was not parseable
  // which in general throws an error anyways
  return false
}
