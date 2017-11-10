import arrayReduce from './arrayReduce'

export default function validateNodeList(validator, maxLength) {
  return nodes => {
    if (maxLength && nodes.length > maxLength) {
      return false
    }

    return arrayReduce(
      nodes,
      (isValid, singleNode) => isValid && validator(singleNode),
      true
    )
  }
}
