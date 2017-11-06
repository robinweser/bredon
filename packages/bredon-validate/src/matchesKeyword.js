/* @flow */
import { isIdentifier } from 'bredon-types'

import valueKeywords from './data/valueKeywords'

export default function matchesKeyword(property: string): Function {
  return (node: any): boolean =>
    // the value needs to be an identifier
    isIdentifier(node) &&
    // only match if the property has keyword values
    valueKeywords[property] &&
    // if the value is an actual property keyword
    valueKeywords[property].indexOf(node.value) !== -1
}
