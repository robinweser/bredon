/* @flow */
const resolvers = {
  lower: value => value.toLowerCase(),
  upper: value => value.toUpperCase(),
}

export default function casePlugin(config?: Object = {}): Object {
  const finalCase = config.case || 'lower'

  return {
    Identifier({ node }) {
      node.value = resolvers[finalCase](node.value)
    },
    HexColor({ node }) {
      node.value = resolvers[finalCase](node.value)
    },
    Dimension({ node }) {
      node.unit = resolvers[finalCase](node.unit)
    },
    Assignment({ node }) {
      node.name = resolvers[finalCase](node.name)
    },
  }
}
