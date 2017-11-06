
# AST Nodes
Every AST node is an object with certain properties. They all share the `type` field which explicitly describes the node's type.<br>
All primitive nodes also share the `value` property which simply yields the node's value.<br>
Container nodes on the other hand have a property that contains an array of child nodes.

### Root Node
There are two different root node types.

#### CSSValue
The CSSValue root is used if the parsed CSS value only contains a single value definition.<br>
Basically all values are single values as long as they're not comma-separated.

For example, both `1px` and `1px solid black` are single values.

```javascript
{
  type: 'CSSValue',
  important: false,
  body: [
    /* child nodes */
  ]
}
```

#### MultiValue
The MultiValue root is used if the parsed value string contains multiple comma-separated values.<br>
It contains at least 2 CSSValue child nodes.

For example, `opacity 100ms linear, transform 1s ease-in` is a multi value.

```javascript
{
  type: 'MultiValue',
  body: [{
    type: 'CSSValue',
    important: true,
    body: [
      /* first value child nodes */
    ]
  }, {
    type: 'CSSValue',
    important: false,
    body: [
      /* second value child nodes */
    ]
  }]
}
```


### Node Types
* [Identifier](#identifier)
* [Integer](#integer)
* [Keyword](#keyword)
* [Operator](#operator)
* [HexColor](#hexcolor)
* [Parenthesis](#parenthesis)
* [URL](#url)
* [StringLiteral](#stringliteral)
* [Dimension](#dimension)
* [Float](#float)
* [FunctionExpression](#functionexpression)
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
  value: 'FF66FF'
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

## StringLiteral
Strings are all values that are wrapped in quotes, either single `'` or double `"`.

| Property | Value | Description |
| ------ | --- | ------ |
| quote | `'`, `"` | The used quote type |

```javascript
// e.g. "I'm a string!!11!1"
{
  type: 'StringLiteral',
  value: 'I\'m a string!!11!1',
  quote: '"'
}
```

## Dimension
Dimensions are special integers or floats that are postfixed with an extra unit. They are used *e.g. to measure font sizes*.

| Property | Value | Description |
| ------ | --- |  ------ |
| value | (*number*) | The pure value without a unit |
| unit | `%`, `em`, `ex`, `ch`, `rem`, `vw`, `vh`, `vmin`, `vmax`, `cm`, `mm`, `q`, `in`, `pt`, `pc`, `px`, `deg`, `grad`, `rad`, `turn`, `s`, `ms`, `Hz`, `kHz`, `dpi`, `dpcm`, `dppx`  | The concrete dimension unit |


```javascript
// e.g. 12px
{
  type: 'Dimension',
  unit: 'px',
  value: 12
}
```

## Float
Floats are floating-point numbers with a fractional part and an integer part.

| Property | Value | Description |
| ------ | --- | ------ |
| integer | (*number*) |The integer part  |
| fractional | (*number*) | The fractional part |
| negative | (*boolean*) | flag indicating a negative value |

```javascript
// e.g. 587.923
{
  type: 'Float',
  integer: 587,
  fractional: 923,
  negative: false
}
```

## FunctionExpression
Functions represent CSS functions wrapped in parentheses.

| Property | Value | Description |
| ------ | --- | ------ |
| callee | (*string*) | The function name |
| params | *(Array)* | An array of function parameter of any AST node type |

```javascript

// e.g. rgba(10, 20, 30, 0.55)
{
  type: 'FunctionExpression',
  callee: 'rgba',
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
Expressions are mathematical calculations.<br>
They can only appear inside the CSS `calc`-function.

| Property | Value | Description |
| ------ | --- | ------ |
| body | (*Array*) | An array of any AST nodes |

```javascript

// e.g. 100% - 30px*3
{
  type: 'Expression',
  body: [{
    type: 'Dimension',
    value: 100,
    unit: '%'
  }, {
    type: 'Operator',
    value: '-'
  }, {
    type: 'Dimension',
    value: 30,
    unit: 'px'
  }, {
    type: 'Operator',
    value: '*'
  }, {
    type: 'Integer',
    value: 3
  }]
}
```
