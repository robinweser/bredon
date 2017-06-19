/* @flow */
export default function getQuoteType(quote: string): ?string {
  if (quote.match(/^('|\\')$/) !== null) {
    return 'single'
  }
  if (quote.match(/^("|\\")$/) !== null) {
    return 'double'
  }
}
