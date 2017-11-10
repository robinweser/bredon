import arrayReduce from './arrayReduce'

export default function validateUnorderedNodeList(nodes, validators) {
  return arrayReduce(
    nodes,
    (isValid, singleNode) => {
      const matchedValidator = validators.find(validator =>
        validator(singleNode)
      )

      if (matchedValidator) {
        validators.splice(validators.indexOf(matchedValidator), 1)
        return isValid && true
      }

      return false
    },
    true
  )
}
