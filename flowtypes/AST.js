export type SimpleNode = { type: string, value: string | number }
export type FunctionNode = { type: string, callee: string, params: Array<Node> }
export type DimensionNode = {
  type: string,
  value: number,
  dimension: string,
  unit: string
}
export type FloatNode = {
  type: string,
  value: string,
  integer: number,
  fractional: number
}

export type Node = SimpleNode | FunctionNode | DimensionNode | FloatNode

export type CSSValue = { type: 'CSSValue', body: Array<Node> }
export type AST = { type: 'MultiValue', values: Array<CSSValue> }

export type ASTNode = Node | CSSValue | AST
