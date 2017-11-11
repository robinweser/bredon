import type { ASTNode } from '../../../../flowtypes/AST'
import type { Path } from '../../../../flowtypes/Path'

export default function createPath(node: ASTNode, parentPath?: Path): Path {
  if (!parentPath) {
    return {
      node,
    }
  }

  const parentNode = parentPath.node
  const container = parentNode.body || parentNode.params

  return {
    parentPath,
    parent: parentNode,
    node,
    replaceNode(newNode: ASTNode): void {
      if (container) {
        const nodeIndex = container.indexOf(node)
        container[nodeIndex] = newNode
        this.node = newNode
      }
    },
    removeNode(): void {
      if (container) {
        const nodeIndex = container.indexOf(node)
        container.splice(nodeIndex, 1)
      }
    },
  }
}
