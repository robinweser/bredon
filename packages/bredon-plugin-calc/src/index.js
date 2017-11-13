/* @flow */
import reduceCalc from 'reduce-css-calc'

export default function initialPlugin(config?: Object = {}): Object {
  const precision = config.precision || 2

  return ({ generate, parse, types }) => ({
    FunctionExpression({ node, replaceNode }) {
      if (node.callee === 'calc') {
        replaceNode(parse(reduceCalc(generate(node), precision)))
      }
    },
  })
}
