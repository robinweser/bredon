export default function normalizeNodeList(nodes, isMultiValue) {
  return isMultiValue ? nodes : [nodes]
}
