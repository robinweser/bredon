import type { ASTNode } from '../../../../flowtypes/AST'
import type { Path } from '../../../../flowtypes/Path'

export default function createPath(
  node: ASTNode,
  parentPath?: Path,
  context?: Object
): Path {
  // if we don't have a parentPath (AST entry)
  // we can't have replaceNode, removeNode, parent and parentNode
  if (!parentPath) {
    return {
      node,
      context,
    }
  }

  const parentNode = parentPath.node
  const container = parentNode.body || parentNode.params

  const path = {
    parentPath,
    parent: parentNode,
    node,
    context,
    replaceNode(newNode: ASTNode): void {
      if (container) {
        const nodeIndex = container.indexOf(node)
        container[nodeIndex] = newNode
        path.node = newNode
      }
    },
    removeNode(): void {
      if (container) {
        const nodeIndex = container.indexOf(node)
        container.splice(nodeIndex, 1)
      }
    },
  }

  return path
}
