import { compile } from 'bredon'

import calc from 'bredon-plugin-calc'
import color from 'bredon-plugin-color'
import initial from 'bredon-plugin-initial'
import trimHex from 'bredon-plugin-trim-hex'
import precision from 'bredon-plugin-precision'

const generators = {
  ValueList: (node, generate) => node.body.map(generate).join(','),
  Float: node =>
    `${node.negative ? '-' : ''}${node.integer
      ? node.integer
      : ''}.${node.fractional}`,
  FunctionExpression: (node, generate) =>
    `${node.callee}(${node.params.map(generate).join(',')})`,
}

const plugins = [
  calc(),
  precision({ precision: 2 }),
  color({
    format: 'hex',
  }),
  trimHex(),
  initial({
    useShorter: true,
  }),
]

export default function minify(property: string, value: string): string {
  return compile(value, {
    context: {
      property,
    },
    generators,
    plugins,
  })
}
