
# AST Nodes
Every AST node is an object with certain properties.<br>
They all share the `type` field which explicitly describes the node's type.<br>
Many also have the `value` field which simply yields the node's value.

All other properties will be described below.<br>
Every AST is wrapped in the same CSSValue root node.
```javascript
{
type: 'CSSValue',
body: [ /* child nodes */ ]
}
```

### Node Types
* [Identifier](#identifier)
* [Integer](#integer)
* [Keyword](#keyword)
* [Operator](#operator)
* [Color](#color)
* [Dimension](#dimension)
* [Float](#float)
* [Function](#function)

## Identifier
Identifiers are all kind of words such as `solid`.
```javascript
// e.g. solid
{
type: 'Identifier',
value: 'solid'
}
```

## Integer
Integers are simple numbers without a unit or fractional part.
```javascript
// e.g. 34
{
type: 'Integer',
value: 34
}
```

## Keyword
Keywords are special identifier that are globally valid for CSS. These are `inherit`, `initial` and `unset`.
```javascript
// e.g. inherit
{
type: 'Keyword',
value: 'inherit'
}
```

## Operator
Operators are basic arithmetic expression symbols for addition `+`, subtraction `-`, multiplication `*`, and division `/`.

```javascript
// e.g. +
{
type: 'Operator',
value: '+'
}
```

## Color
Dimensions are special integers or floats that are postfixed with an extra unit. They are used *e.g. to measure font sizes*.

| Property | Value | Description |
| ------ | --- | ------ |
| color | `hexadecimal` | The type of the color |

> More color types soon

```javascript
// e.g. #FF66FF
{
type: 'Color',
value: '#FF66FF',
color: 'hexadecimal'
}
```

## Dimension
Dimensions are special integers or floats that are postfixed with an extra unit. They are used *e.g. to measure font sizes*.


| Property | Value | Description |
| ------ | --- |  ------ |
| dimension | `absolute-length`, `percentage`, `font-length`, `viewport-length`, `angle`, `duration`, `frequency`, `resolution` |  The type of dimension |
| unit | `%`, `em`, `ex`, `ch`, `rem`, `vw`, `vh`, `vmin`, `vmax`, `cm`, `mm`, `q`, `in`, `pt`, `pc`, `px`, `deg`, `grad`, `rad`, `turn`, `s`, `ms`, `Hz`, `kHz`, `dpi`, `dpcm`, `dppx`  | The concrete dimension unit |


```javascript
// e.g. 12px
{
type: 'Dimension',
value: 12,
unit: 'px',
dimension: 'absolute-length'
}
```

## Float
Floats are floating-point numbers with a fractional part and an integer part. *(If the integer part is omitted, it is represented by `0`)*


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

## Function
Functions represent CSS functions wrapped in parentheses.

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
