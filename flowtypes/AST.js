export type SimpleNode = { type: string, value: string | number }
export type FunctionNode = {
  type: 'Function',
  callee: string,
  params: Array<Node>
}
export type DimensionNode = {
  type: 'Dimension',
  value: number,
  dimension: string,
  unit: string
}
export type FloatNode = {
  type: 'Float',
  value: string,
  integer: number,
  fractional: number
}
export type StringNode = {
  type: 'String',
  value: string,
  quote: '"' | "'"
}
export type ExpressionNode = {
  type: 'Expression',
  body: Array<Node>
}

export type Node =
  | SimpleNode
  | FunctionNode
  | DimensionNode
  | FloatNode
  | StringNode
  | ExpressionNode

export type CSSValue = { type: 'CSSValue', body: Array<Node> }
export type AST = { type: 'MultiValue', values: Array<CSSValue> }

export type ASTNode = Node | CSSValue | AST
