/* @flow */
const defaultFormats = {
  length: 'px',
  time: 'ms',
  angle: 'deg',
}

const groups = {
  length: /^(px|in|pt|pc|cm|mm|q)$/i,
  time: /^((m)?s)$/i,
  angle: /^(deg|rad|grad|turn)$/i,
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
  precision?: number = 6
): number {
  const precisionFactor = Math.pow(10, precision)

  return (
    Math.round(normalize(value, from) * convertion[to] * precisionFactor) /
    precisionFactor
  )
}

function getGroup(unit: Unit): ?string {
  return Object.keys(groups).find(group => unit.match(groups[group]) !== null)
}

function isFloat(value: number): boolean {
  return value === +value && value !== (value | 0)
}

export default function unitPlugin(config?: Object = {}): Object {
  const configFormats = config.formats || {}
  const precision = config.precision || 4

  const formats = {
    ...defaultFormats,
    ...configFormats,
  }

  return ({ types }) => ({
    Dimension({ node }) {
      const group = getGroup(node.unit)

      if (group) {
        const format = formats[group]
        const value =
          node.value.value || node.value.integer + node.value.fractional

        const newValue = convert(value, node.unit, format, precision)

        node.unit = format

        if (isFloat(newValue)) {
          const integerPart = Math.floor(newValue)
          const precisionFactor = Math.pow(10, precision)

          const floatPart =
            Math.round((newValue - integerPart) * precisionFactor) /
            precisionFactor

          node.value = types.float(integerPart, floatPart, node.negative)
        } else {
          node.value = types.integer(newValue, node.negative)
        }
      }
    },
  })
}
