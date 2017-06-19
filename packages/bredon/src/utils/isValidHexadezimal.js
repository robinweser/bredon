/* @flow */
export default function isValidHexadezimal(value: string): boolean {
  return value.match(/^[0-9a-f]$/i) !== null
}
