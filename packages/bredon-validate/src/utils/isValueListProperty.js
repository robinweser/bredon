/* @flow */
import valueListProperties from '../data/valueListProperties'

export default function isValueListProperty(property: string): boolean {
  return valueListProperties[property] || false
}
