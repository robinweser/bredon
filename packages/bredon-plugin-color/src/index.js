/* @flow */
import { generate } from 'bredon'
import { wrap } from 'bredon-tools'
import { hexColor } from 'bredon-types'
import color from 'color'

export default function colorPlugin(config: Object): Object {
  return {
    FunctionExpression(node, parentNode) {
      if (node.callee.match(/^(rgba?|hsla?)$/) !== null) {
        const hexValue = color(generate(node))
          .hex()
          .slice(1)

        wrap(parentNode).replaceChildNode(node, hexColor(hexValue))
      }
    }
  }
}
