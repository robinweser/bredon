/* @flow */
export default function getQuoteType(quote: string): ?string {
  if (quote.match(/^('|\\')$/) !== null) {
    return "'"
  }
  if (quote.match(/^("|\\")$/) !== null) {
    return '"'
  }
}
