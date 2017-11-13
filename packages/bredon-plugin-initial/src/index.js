/* @flow */
import valueInitials from './valueInitials'

const INITIAL = 'initial'

export default function initialPlugin(config?: Object = {}): Object {
  const useShorter = config.useShorter || false

  return ({ generate, parse, types }) => ({
    Identifier({ node, context, replaceNode }) {
      if (node.value === INITIAL) {
        const initialValue = valueInitials[context.property]

        if (
          initialValue &&
          (!useShorter || initialValue.length < INITIAL.length)
        ) {
          replaceNode(parse(initialValue))
        }
      }
    },
    Value({ node, context, replaceNode }) {
      if (useShorter) {
        const initialValue = valueInitials[context.property]

        if (
          initialValue &&
          initialValue === generate(node) &&
          initialValue.length > INITIAL.length
        ) {
          replaceNode(types.identifier(INITIAL))
        }
      }
    },
  })
}
