export type SimpleNode = {type: string, value: string | number};
export type FunctionNode = {type: string, callee: string, params: Array<Node>};
export type DimensionNode = {type: string, value: number, dimension: string, unit: string};
export type FloatNode = {type: string, value: string, integer: number, fractional: number};

export type Node = SimpleNode | FunctionNode | DimensionNode | FloatNode;
export type AST = {type: 'CSSValue', body: Array<Node>};
