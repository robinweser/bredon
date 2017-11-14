import { isDimension } from 'bredon-types'

const ANGLE_REGEX = /^(rad|deg|turn|grad)$/i

export default function isAngle(node) {
  return isDimension(node) && node.unit.match(ANGLE_REGEX) !== null
}
