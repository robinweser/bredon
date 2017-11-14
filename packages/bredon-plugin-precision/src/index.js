/* @flow */

function getDigits(value: number): number {
  return (Math.log(value) * Math.LOG10E + 1) | 0
}

function reducePrecision(value: number, precision: number): number {
  const digits = getDigits(value)

  if (digits > precision) {
    return Math.round(value / Math.pow(10, digits - precision))
  }

  return value
}

export default function precisionPlugin(config?: Object = {}): Object {
  const precision = config.precision || 4

  return ({ generate, parse }) => ({
    Float({ node, replaceNode }) {
      node.fractional = reducePrecision(node.fractional, precision)
    },
  })
}
