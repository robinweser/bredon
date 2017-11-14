/* @flow */
const defaultFormats = {
  length: 'px',
  time: 'ms',
  angle: 'deg',
}

const convertion = {
  // length
  px: 1,
  in: 0.01041666667,
  pt: 0.75,
  pc: 0.0625,
  cm: 0.02645833305,
  mm: 0.2645833305,
  q: 0.06614583262,
  // angle
  deg: 1,
  rad: 0.01745329252,
  grad: 1.1111111111,
  turn: 0.002777777778,
  // time
  ms: 1,
  s: 0.001,
}

type Unit =
  | 'px'
  | 'in'
  | 'pt'
  | 'pc'
  | 'cm'
  | 'mm'
  | 'q'
  | 'deg'
  | 'rad'
  | 'grad'
  | 'turn'
  | 'ms'
  | 's'

function normalize(value: number, unit: Unit): number {
  return value / convertion[unit]
}

function convert(
  value: number,
  from: Unit,
  to: Unit,
  precision?: number = 5
): number {
  const precisionFactor = Math.pow(10, precision)

  return (
    Math.round(normalize(value, from) * convertion[to] * precisionFactor) /
    precisionFactor
  )
}

export default function unitPlugin(config?: Object = {}): Object {
  const configFormats = config.formats || {}

  const format = {
    ...defaultFormats,
    ...configFormats,
  }

  return ({ generate, parse }) => ({
    Dimension({ node }) {},
  })
}
