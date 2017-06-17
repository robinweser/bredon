# API Reference


## `parse(cssValue)`

Parses a CSS value into an AST and returns a ParsedCSSValue to work with.

### Arguments
1. `cssValue` (*string*): The CSS value that gets parsed

### Returns
(*[ParsedCSSValue](#parsedcssvalue)*) An object containing methods and information for the parsed `cssValue`

### Example

```javascript
import { parse } from 'bredon'

const cssValue = '1px solid rgba(100, 200, 50, 0.55)'
const parsedCSSValue = parse(cssValue)
```

## ParsedCSSValue
Every `ParsedCSSValue` is an object containing 3 methods to modify and convert the parsed value information.

#### Methods
* [`traverse(visitors)`](#traversevisitors)
* [`toString([formatters])`](#tostring-formatters)
* [`toAST()`](#toast)

------

### `traverse(visitors)`
Traverses every AST node recursively and calls the visitor methods for each AST node respectively. It can also be used to actually transform the AST.

#### Arguments
1. `visitors` (*Object*): An object with AST node names as keys and a `enter` and/or `exit` function. Both `enter` and `exit` get the current node and its parent node passed as arguments.

#### Example

```javascript
import { parse } from 'bredon'

const cssValue = '1px solid rgba(100, 200, 50, 0.55)'
const parsedCSSValue = parse(cssValue)

const visitors = {
  Float: {
    enter(node, parentNode) {
      console.log(node)
      node.fractional = 123
    }

    exit(node, parentNode) {
      console.log(node)
    }
  }
}

parsedCSSValue.traverse(visitors)
// => { type: 'Float', integer: 0, fractional: 55 }
// => { type: 'Float', integer: 0, fractional: 123 }
```

------

### `toString([formatters])`
Renders the AST into a single, formatted string. It uses opinionated formatting rules and generates specification-conform CSS values.

#### Arguments
1. `formatters` (*Object?*): Similar to the `visitors` option passed to `traverse`, we can pass an object with AST node type formatters. If an AST node type is not explicitly passed, it will use the default formatter. The formatter signature is `(node, generate) => string` where `node` is the current AST node and `generate` is a function to recursively format inner child nodes.


##### Returns
(*string*) formatted and minified string version of the CSS value
##### Example

```javascript
import { parse } from 'bredon'

const cssValue = ' 1px solid   rgba(100 , 200, 50, 0.55 )'
const parsedCSSValue = parse(cssValue)

const output = parsedCSSValue.toString({
  Function: (node, generate) =>
    `${node.callee}(${node.params.map(generate).join(', ')})`
})

console.log(output)
// => '1px solid rgba(100, 200, 50, .55)'
```

------

### `toAST()`
Returns the generated AST as a single nested object.

#### Returns
(*Object*) Returns the full AST as an object
#### Example

```javascript
import { parse } from 'bredon'

const cssValue = ' 1px solid rgba(100, 200, 50, 0.55)'
const parsedCSSValue = parse(cssValue)

const ast = parsedCSSValue.toAST()

// returns the following ast
ast === {
  type: 'CSSValue',
  body: [{
    type: 'Dimension',
    value: 1,
    unit: 'px',
    dimension: 'absolute-length'
  }, {
    type: 'Identifier',
    value: 'solid'
  }, {
    type: 'Function',
    callee: 'rgba',
    params: [{
      type: 'Integer',
      value: 100
    }, {
      type: 'Integer',
      value: 200
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
