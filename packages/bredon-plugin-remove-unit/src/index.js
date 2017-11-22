/* @flow */
export default function removeUnitPlugin(): Object {
  return ({ types }) => {
    function isZero(node) {
      return (
        (types.isInteger(node.value) && node.value.value === 0) ||
        (types.isFloat(node.value) &&
          node.value.integer === 0 &&
          node.value.fractional === 0)
      )
    }

    return {
      Dimension({ node, replaceNode }) {
        if (isZero(node)) {
          replaceNode(types.integer(0))
        }
      },
    }
  }
}
