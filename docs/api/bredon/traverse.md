# `traverse(ast, [visitors], [context])`

Traverses every AST node recursively and calls the visitor methods for each AST node respectively.<br>
It is commonly used to apply AST transformation.

## Arguments
1. `ast` (*Object)*: An object containing the AST representation of a CSS value string
2. `visitors` (*Array?*): An array of visitor objects with AST node names as keys and an object containing `enter` and/or `exit` methods. If a method is provided directly, it will resolve to the `enter` method. The signature for both is *(node, parentNode) => void*
3. `context` (*Object?*): An object containing additional context information which is required by some plugins

#### Context
| Option | Value | Description |
| ------ | ----- | ----------- |
| property | (*string*) | The CSS property name that's associated with the compiled value | 

#### Example
```javascript
import { travsere, parse } from 'bredon'

const input = '1px solid rgba(100, 250, 50, 0.55)'
const ast = parse(input)

const visitor = {
  Float: {
    enter(path) {
      console.log(path.parent.callee)
      console.log(path.node)
      // transforming the fractional part of each float
      path.node.fractional += 0.5
    }

    exit(path) {
      console.log(path.node)
    }
  }
}

traverse(ast, [visitor])
// => rgba
// => { type: 'Float', integer: 0, fractional: 0.55, negative: false }
// => { type: 'Float', integer: 0, fractional: 0.60, negative: false }
```
