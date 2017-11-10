import arrayReduce from './arrayReduce'

export default function validateNodeList(validator) {
  return nodes =>
    arrayReduce(
      nodes,
      (isValid, singleNode) => isValid && validator(singleNode),
      true
    )
}
