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

  return {
    FunctionExpression(path, { generate, parse }) {
      if (path.node.callee.match(COLOR_REGEX) !== null) {
        const value = color(generate(path.node))

        if (!(format === 'hex' && preserveAlpha && value.alpha() < 1)) {
          path.replaceNode(parse(resolvers[format](value)))
        }
      }
    },
    HexColor(path, { generate, parse }) {
      const value = color(generate(path.node))
      path.replaceNode(parse(resolvers[format](value)))
    },
    Identifier(path, { generate, parse }) {
      // TODO: ugly
      try {
        const value = color(generate(path.node))
        path.replaceNode(parse(resolvers[format](value)))
      } catch (e) {}
    },
  }
}
