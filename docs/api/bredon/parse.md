# `parse(input)`

Parses a CSS value string into a uniform Abstract Syntax Tree (AST).

## Arguments
1. `input` (*string*): The CSS value that gets parsed

## Returns
(*Object*) Returns the full AST as an object

## Example
```javascript
import { parse } from 'bredon'

const input = '1px solid rgba(100, 250, 50, 0.55)'
const ast = parse(input)

ast === {
  type: 'ValueList',
  body: [{
    type: 'Value',
    important: false,
    body: [{
      type: 'Dimension',
      unit: 'px',
      value: {
        type: 'Integer',
        negative: false,
        value: 1
      }
    }, {
      type: 'Identifier',
      value: 'solid'
    }, {
      type: 'FunctionExpression',
      callee: 'rgba',
      params: [{
        type: 'Integer',
        negative: false,
        value: 100
      }, {
        type: 'Integer',
        negative: false,
        value: 250
      }, {
        type: 'Integer',
        negative: false,
        value: 50
      }, {
        type: 'Float',   
        negative: false,
        fractional: 0.55,
        integer: 0
      }]
    }]
  }]
}
```
