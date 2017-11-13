/* @flow */
import color from 'color'

const resolvers = {
  rgb: value => value.rgb().string(),
  hsl: value => value.hsl().string(),
  hex: value => value.hex(),
}

const COLOR_REGEX = /^(rgba?|hsla?)$/i

export default function colorPlugin(config?: Object = {}): Object {
  const preserveAlpha = config.preserveAlpha || true
  const format = config.format || 'hex'

  return ({ generate, parse }) => ({
    FunctionExpression({ node, replaceNode }) {
      if (node.callee.match(COLOR_REGEX) !== null) {
        const value = color(generate(node))

        if (!(format === 'hex' && preserveAlpha && value.alpha() < 1)) {
          replaceNode(parse(resolvers[format](value)))
        }
      }
    },
    HexColor({ node, replaceNode }) {
      const value = color(generate(node))
      replaceNode(parse(resolvers[format](value)))
    },
    Identifier({ node, replaceNode }) {
      // TODO: ugly
      try {
        const value = color(generate(node))
        replaceNode(parse(resolvers[format](value)))
      } catch (e) {}
    },
  })
}
