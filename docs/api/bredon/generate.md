# `generate(ast, [generators])`

Renders the AST into a single, formatted string. It uses opinionated formatting rules and generates specification-conform CSS values.

#### Arguments
1. `ast` (*Object)*: An object containing the AST representation of a CSS value string
2. `generators` (*Object?*): Similar to the `visitors` option passed to `traverse`, we can pass an object with AST node type formatters. If an AST node type is not explicitly passed, it will use the default formatter. The formatter signature is `(node, generate) => string` where `node` is the current AST node and `generate` is a function to recursively format inner child nodes.


##### Returns
(*string*) formatted and minified string version of the CSS value

##### Example

```javascript
import { generate, parse } from 'bredon'

const input = ' 1px solid   rgba(100   , 200, 50, 0.55 ) '
const ast = parse(input)

const generators = {
  Function: (node, generate) =>
    `${node.callee}(${node.params.map(generate).join(', ')})`
}

const output = generate(ast, generators)

console.log(output)
// => '1px solid rgba(100, 200, 50, .55)'
```
