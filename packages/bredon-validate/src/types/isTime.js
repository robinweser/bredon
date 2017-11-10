import { isDimension } from 'bredon-types'

const TIME_UNIT = /^((m)?s)$/

export default function isTime(node) {
  return isDimension(node) && node.unit.match(TIME_UNIT) !== null
}
