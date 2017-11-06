/* @flow */
import { isIdentifier } from 'bredon-types'

export default function matchesIdentifier(
  identifiers: Array<string> = []
): Function {
  return (node: any): boolean =>
    // the value needs to be an identifier
    isIdentifier(node) &&
    // if the value is an actual property keyword
    identifiers.indexOf(node.value) !== -1
}
