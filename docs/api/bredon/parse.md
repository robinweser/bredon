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
  type: 'CSSValue',
  body: [{
    type: 'Dimension',
    unit: 'px',
    value: {
      type: 'Integer',
      value: 1
    }
  }, {
    type: 'Identifier',
    value: 'solid'
  }, {
    type: 'Function',
    callee: {
      type: 'Identifier',
      value: 'rgba'
    },
    params: [{
      type: 'Integer',
      value: 100
    }, {
      type: 'Integer',
      value: 250
    }, {
      type: 'Integer',
      value: 50
    }, {
      type: 'Float',
      integer: 0,
      fractional: 55
    }]
  }]
}
```