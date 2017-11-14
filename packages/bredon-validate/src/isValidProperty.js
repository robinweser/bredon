/* @flow */
import { isValueList, isValue } from 'bredon-types'
import unprefixProperty from 'css-in-js-utils/lib/unprefixProperty'

import isValueListProperty from './utils/isValueListProperty'
import isMultiValueProperty from './utils/isMultiValueProperty'
import matchesKeyword from './utils/matchesKeyword'
import arrayReduce from './utils/arrayReduce'

import isGlobal from './types/isGlobal'

import propertyValidators from './propertyValidators'
import properties from './data/properties'
import _missingProps from './data/_missingProps'

const defaultValidator = () => false

export default function isValidProperty(
  property: string,
  ast: any,
  isList?: boolean = false
): boolean {
  // if we do not know a property, we just skip it
  // and pretend its valid anyways
  // TODO: add valid property list
  if (!properties.hasOwnProperty(property)) {
    const unprefixedProperty = unprefixProperty(property)

    // we also check for prefixed properties that are
    // actually standard CSS properties
    if (properties.hasOwnProperty(unprefixedProperty)) {
      return isValidProperty(unprefixedProperty, ast, isList)
    }

    // TODO: remove as soon as 100% props are covered
    if (_missingProps.indexOf(property) !== -1) {
      return true
    }

    console.warn(
      `Unknown property: "${property}". If it is a valid CSS property, please file an issue.
https://github.com/rofrischmann/bredon/issues/new`
    )
    return true
  }

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
        isValid && isValidProperty(property, cssValue, ast.body.length > 1),
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

      return validator(ast.body, true, isList)
    }

    const node = ast.body[0]

    return (
      // global values are always valid
      isGlobal(node) ||
      // also check for any keyword value
      matchesKeyword(property)(node) ||
      // use the property validator
      validator(node, false, isList)
    )
  }

  // TODO: true or false?
  // this branch can only be reached if the value was not parseable
  // which in general throws an error anyways
  return false
}
