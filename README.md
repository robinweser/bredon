# Bredon

Bredon is a modern CSS value parser in JavaScript.
It uses very detailed nodes and provides as much information as possible for each value.

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/bredon.svg?branch=master">
<a href="https://codeclimate.com/github/rofrischmann/bredon/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/bredon/badges/coverage.svg"></a>
<img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-2.67kb-brightgreen.svg">
<img alt="npm version" src="https://badge.fury.io/js/bredon.svg">
<a href="https://gitter.im/rofrischmann/bredon"><img alt="Gitter" src="https://img.shields.io/gitter/room/rofrischmann/bredon.svg"></a>

## Installation
```sh
yarn add bredon
```
Assuming you are using [npm](https://www.npmjs.com) as your package manager you can use `npm i --save bredon`.
We also provide [UMD](https://github.com/umdjs/umd) builds. You can easily use them via [unpkg](https://unpkg.com/).
```HTML
<!-- Development Build -->
<script src="https://unpkg.com/bredon@1.0.0/dist/bredon.js"></script>
<!-- Minified (Production) Build -->
<script src="https://unpkg.com/bredon@1.0.0/dist/bredon.min.js"></script>
```

## Why?
I am heavily involved in the whole CSS-in-JS movement with [Fela](https://github.com/rofrischmann/fela), [Lorren](https://github.com/rofrischmann/lorren) and [Elodin](https://github.com/rofrischmann/react-look) as well as [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer). While writing Elodin, a plugin-based style object linter, I struggled to do complex value validation and related operations. That's why I built Lorren, a plugin-based style object analyzer, to get as much information as possible, for each property-value pair. While stuff like *"Is the property/value prefixed?"* or even *"Is it compatible with browser ...?"* has been pretty straightforward, I really couldn't come up with a simple solution to correctly validate CSS values with all their complexity.<br>
Here, I made the decision to write a modern CSS value parser that provides the required degree of accuracy and detail - Bredon.


## How?

## API
### `parse(cssValue)`

Renders all cached styles into a DOM node. It also adds a change listener to automatically add newly rendered styles.

#### Arguments
1. `cssValue` (*string*): The CSS value that gets parsed

#### Returns
(*[ParsedCSSValue](#parsedcssvalue)*) An object containing methods and information for the parsed `cssValue`

#### Example

```javascript
import { parse } from 'bredon'

const cssValue = '1px solid rgba(100, 200, 50, 0.55)'
const parsedCSSValue = parse(cssValue)
```

------

### ParsedCSSValue
Every `ParsedCSSValue` is an object containing 3 methods to modify and convert the parsed value information.

##### Methods
* [`traverse(visitors)`](#traversevisitors)
* [`toString()`](#tostring)
* [`toAST()`](#toast)

#### `travsere(visitors)`
Traverses every AST node recursively and calls the visitor methods for each AST node respectively. It can also be used to actually transform the AST.

##### Arguments
1. `visitors` (*Object*): An object with AST node names as keys and a `enter` and/or `exit` function. Both `enter` and `exit` get the current node and its parent node passed as arguments.

##### Example

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

#### `toString()`
Renders all cached styles into a DOM node. It also adds a change listener to automatically add newly rendered styles.

##### Returns
(*string*) formatted and minified string version of the CSS value
##### Example

```javascript
import { parse } from 'bredon'

const cssValue = ' 1px solid  rgba(100 , 200, 50, 0.55 )'
const parsedCSSValue = parse(cssValue)

console.log(parsedCSSValue.toString())
// => '1px solid rgba(100,200,50,.55)'
```

#### `toAST()`
Renders all cached styles into a DOM node. It also adds a change listener to automatically add newly rendered styles.

##### Returns
(*Object*) Returns the full AST as an object
##### Example

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


## AST Nodes
Every AST node is an object with certain properties.<br>
They all share the `type` field which explicitly describes the node's type.<br>
Many also have the `value` field which simply yields the node's value.

All other properties will be described below.

* [CSSValue](#cssvalue)
* [Identifier](#identifier)
* [Integer](#integer)
* [Keyword](#keyword)
* [Operator](#operator)
* [Dimension](#dimension)
* [Float](#float)
* [Function](#function)

### CSSValue
Every AST is wrapped in the same root node: CSSValue.
```javascript
{
  type: 'CSSValue',
  body: [ /* child nodes */ ]
}
```

### Identifier
Identifiers are all kind of words such as `solid`.
```javascript
// e.g. solid
{
  type: 'Identifier',
  value: 'solid'
}
```

### Integer
Integers are simple numbers without a unit or fractional part.
```javascript
// e.g. 34
{
  type: 'Integer',
  value: 34
}
```

### Keyword
Keywords are special identifier that are globally valid for CSS. These are `inherit`, `initial` and `unset`.
```javascript
// e.g. inherit
{
  type: 'Keyword',
  value: 'inherit'
}
```

### Operator
Operators are basic arithmetic expression symbols for addition `+`, subtraction `-`, multiplication `*`, and division `/`.

```javascript
// e.g. +
{
  type: 'Operator',
  value: '+'
}
```

### Dimension
Dimensions are special integers or floats that are postfixed with an extra unit. They are used *e.g. to measure font sizes*.

##### Specific Properties

| Property | Description |
| ------ | ------ |
| dimension | The type of dimension |
| unit | The concrete dimension unit |

```javascript
// e.g. 12px
{
  type: 'Dimension',
  value: 12,
  unit: 'px',
  dimension: 'absolute-length'
}
```

### Float
Floats are floating-point numbers with a fractional part and an integer part. *(If the integer part is omitted, it is represented by `0`)*

##### Specific Properties

| Property | Description |
| ------ | ------ |
| integer | The integer part |
| fractional | The fractional part |

```javascript
// e.g. 587.923
{
  type: 'Float',
  integer: 587,
  fractional: 923
}
```

### Function
Functions represent CSS functions wrapped in parentheses.

##### Specific Properties

| Property | Description |
| ------ | ------ |
| callee | The function name |
| params | An array of function parameter of any AST node type |

```javascript

// e.g. rgba(10, 20, 30, 0.55)
{
  type: 'Function',
  callee: 'rgba'
  params: [ /* param nodes */ ]
}
```


## Support
Join us on [Gitter](https://gitter.im/rofrischmann/bredon). We highly appreciate any contribution.<br>
We also love to get feedback.

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
