import { isDimension } from 'bredon-types'

export default function isAngle(node) {
  return isDimension(node) && node.unit.match(/rad|deg|turn|grad/) !== null
}
