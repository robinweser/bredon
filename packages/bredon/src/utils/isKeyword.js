/* @flow */
export default function isKeyword(value: string): boolean {
  return value.match(/^(initial|inherit|unset|revert)$/i) !== null
}
