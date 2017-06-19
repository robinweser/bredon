/* @flow */
export default function isValidUnit(value: string): boolean {
  return (
    value.match(
      /^(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|q|in|pt|pc|px|deg|grad|rad|turn|(m)?s|(k)?Hz|dpi|dpcm|dppx)$/i
    ) !== null
  )
}
