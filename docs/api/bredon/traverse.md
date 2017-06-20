# `traverse(ast, visitors)`

Traverses every AST node recursively and calls the visitor methods for each AST node respectively.<br>
It is commonly used to apply AST transformation.

#### Arguments
1. `ast` (*Object)*: An object containing the AST representation of a CSS value string
2. `visitors` (*Object*): An object with AST node names as keys and an object containing `enter` and/or `exit` methods. The signature for both is *(node, parentNode) => void*

#### Example
```javascript
import { travsere, parse } from 'bredon'

const input = '1px solid rgba(100, 250, 50, 0.55)'
const ast = parse(input)

const visitors = {
  Float: {
    enter(node, parentNode) {
      console.log(parentNode.callee.value)
      console.log(node)
      // transforming the fractional part of each float
      node.fractional += 5
    }

    exit(node) {
      console.log(node)
    }
  }
}

traverse(ast, visitors)
// => rgba
// => { type: 'Float', integer: 0, fractional: 55 }
// => { type: 'Float', integer: 0, fractional: 60 }
```
