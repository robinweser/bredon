
# AST Nodes
Every AST node is an object with certain properties. They all share the `type` field which explicitly describes the node's type. Many also have the `value` field which simply yields the node's value. All other properties will be described below.<br>

Every AST is wrapped in the same root node `MultiValue`.<br>
It contains **at least** one `CSSValue`.

```javascript
{
  type: 'MultiValue',
  body: [{
    type: 'CSSValue',
    body: [
      /* child nodes */
    ]
  }]
}
```



### Node Types
* [Identifier](#identifier)
* [Integer](#integer)
* [Keyword](#keyword)
* [Important](#important)
* [Operator](#operator)
* [HexColor](#hexcolor)
* [Parenthesis](#parenthesis)
* [URL](#url)
* [String](#string)
* [Dimension](#dimension)
* [Float](#float)
* [Function](#function)
* [Expression](#expression)

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

## Important
Important is a special identifier for the `!important` rule.

```javascript
// e.g. !important
{
  type: 'Important',
  value: '!important'
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

## HexColor
HexColor represents color values given in hexadecimal notation.

```javascript
// e.g. #FF66FF
{
  type: 'HexColor',
  value: '#FF66FF'
}
```

## Parenthesis  
Parenthesis are used to wrap expressions. They may used to enforce e.g. additions to be executed before multiplications. Parenthesis surrounding [Functions](#function) will **not** be parsed into AST nodes.

```javascript
// e.g. (
{
  type: 'Parenthesis',
  value: '('
}
```

## URL
URL is used for any URI-type string. *It is not validated by the parser!*

```javascript
// e.g. https://github.com/
{
  type: 'URL',
  value: 'https://github.com/'
}
```

## String
Strings are all values that are wrapped in quotes, either single `'` or double `"`.

```javascript
// e.g. "I'm a string!!11!1"
{
  type: 'String',
  value: 'I\'m a string!!11!1'
}
```

| Property | Value | Description |
| ------ | --- | ------ |
| quote | `'`, `"` | The used quote type |

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
  params: [{
    type: 'Integer',
    value: 10
  }, {
    type: 'Integer',
    value: 20
  }, {
    type: 'Integer',
    value: 30
  }, {
    type: 'Float',
    integer: 0,
    fractional: 55
  }]
}
```

## Expression
Expressions are mathematical calculations. They may only be used inside the CSS `calc`-function.

| Property | Description |
| ------ | ------ |
| body | An array of any AST nodes |

```javascript

// e.g. 100% - 30px*3
{
  type: 'Expression',
  body: [{
    type: 'Dimension',
    value: 100,
    unit: '%',
    dimension: 'percentage'
  }, {
    type: 'Operator',
    value: '-'
  }, {
    type: 'Dimension',
    value: 30,
    unit: 'px',
    dimension: 'absolute-length'
  }, {
    type: 'Operator',
    value: '*'
  }, {
    type: 'Integer',
    value: 3
  }]
}
```
