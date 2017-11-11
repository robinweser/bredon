export type Path = {
  parent: Path,
  node: ASTNode,
  replace: Function,
  remove: Function,
}
