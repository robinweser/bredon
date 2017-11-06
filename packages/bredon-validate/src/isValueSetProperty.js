/* @flow */
import valueSetProperties from './data/valueSetProperties'

export default function isValueSetProperty(property: string): boolean {
  return valueSetProperties[property] || false
}
