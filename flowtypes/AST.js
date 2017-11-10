export type SimpleNode = { type: string, value: string | number }
export type FunctionNode = {
  type: 'FunctionExpression',
  callee: string,
  params: Array<Node>,
}
export type DimensionNode = {
  type: 'Dimension',
  value: number,
  dimension: string,
  unit: string,
}
export type IntegerNode = {
  type: 'Integer',
  value: number,
  negative?: boolean,
}
export type FloatNode = {
  type: 'Float',
  integer?: number,
  fractional: number,
}
export type StringNode = {
  type: 'StringLiteral',
  value: string,
  quote: '"' | "'",
}
export type ExpressionNode = {
  type: 'Expression',
  body: Array<Node>,
}

export type Node =
  | SimpleNode
  | FunctionNode
  | DimensionNode
  | FloatNode
  | IntegerNode
  | StringNode
  | ExpressionNode

export type Value = {
  type: 'Value',
  body: Array<Node>,
  important: boolean,
  multi: boolean,
}
export type ValueList = { type: 'ValueList', values: Array<Value> }

export type ASTNode = Node | Value | ValueList
