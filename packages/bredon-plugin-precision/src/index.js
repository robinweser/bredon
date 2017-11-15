/* @flow */
function reducePrecision(value: number, precision: number): number {
  const precisionFactor = Math.pow(10, precision)

  return Math.round(value * precisionFactor) / precisionFactor
}

export default function precisionPlugin(config?: Object = {}): Object {
  const precision = config.precision || 4

  return {
    Float({ node, replaceNode }) {
      node.fractional = reducePrecision(node.fractional, precision)
    },
  }
}
