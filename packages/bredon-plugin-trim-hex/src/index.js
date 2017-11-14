/* @flow */
export default function trimHexPlugin(): Object {
  return {
    HexColor({ node }) {
      const trimedValue = node.value.substr(0, 3)

      if (trimedValue === node.value.substr(3, 6)) {
        node.value = trimedValue
      }
    },
  }
}
