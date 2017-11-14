/* @flow */
import reduceCalc from 'reduce-css-calc'

export default function calcPlugin(config?: Object = {}): Object {
  const precision = config.precision || 4

  return ({ generate, parse, types }) => ({
    FunctionExpression({ node, replaceNode }) {
      if (node.callee === 'calc') {
        replaceNode(parse(reduceCalc(generate(node), precision)))
      }
    },
  })
}
