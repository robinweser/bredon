/* @flow */
export default function isKeyword(value: string): boolean {
  return value.match(/^(initial|inherit|unset)$/i) !== null
}
