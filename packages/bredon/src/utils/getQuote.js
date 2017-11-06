/* @flow */
/* eslint-disable consistent-return */
const SINGLE_QUOTE = /^('|\\')$/
const DOUBLE_QUOTE = /^("|\\")$/

export default function getQuoteType(quote: string): ?string {
  if (quote.match(SINGLE_QUOTE) !== null) {
    return "'"
  }

  if (quote.match(DOUBLE_QUOTE) !== null) {
    return '"'
  }
}
