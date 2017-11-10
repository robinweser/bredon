import { isDimension } from 'bredon-types'

export default function isPercentage(node) {
  return isDimension(node) && node.unit === '%'
}
