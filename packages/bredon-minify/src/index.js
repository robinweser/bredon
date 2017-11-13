import { compile } from 'bredon'

import calcPlugin from 'bredon-plugin-calc'
import colorPlugin from 'bredon-plugin-color'
import initialPlugin from 'bredon-plugin-initial'

const generators = {
  ValueList: (node, generate) => node.body.map(generate).join(','),
  Float: node =>
    `${node.negative ? '-' : ''}${node.integer
      ? node.integer
      : ''}.${Math.round(node.fractional * 100) / 100}`,
  FunctionExpression: (node, generate) =>
    `${node.callee}(${node.params.map(generate).join(',')})`,
}

const plugins = [
  calcPlugin(),
  colorPlugin({
    format: 'hex',
  }),
  initialPlugin({
    useShorter: true,
  }),
]

export default function minify(value: string): string {
  return compile(value, {
    generators,
    plugins,
  })
}
