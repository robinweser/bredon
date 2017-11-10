/* @flow */
import multiValueProperties from '../data/multiValueProperties'

export default function isMultiValueProperty(property: string): boolean {
  return multiValueProperties[property] || false
}
