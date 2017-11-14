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
  }
}
