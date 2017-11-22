# Builders

For every AST node, the `bredon-types` package also ships a builder function which safely creates AST nodes manually.

* [dimension](#dimensionvalue-integer-float-unit-unit)
* [expression](#expressionbody-arraynode)
* [float](#floatinteger-number-fractional-number-isnegative-boolean--false)
* [functionExpression](#functionexpressioncallee-string-params-arraynode)
* [hexColor](#hexcolorcolor-string)
* [identifier](#identifiername-string)
* [integer](#integervalue-number-isnegative-boolean--false)
* [operator](#operatorsign--------)
* [parenthesis](#parenthesisparen--)
* [separator](#separator)
* [stringLiteral](#stringliteralstr-string-quote-----)
* [url](#urluri-string)
* [value](#valuebody-arraynode)
* [valueList](#valuelistbody-arraycssvalue)

## `dimension(value: Integer | Float, unit: Unit)`

where Unit refers to one of the valid units:<br>
`%`, `em`, `ex` , `ch` , `rem` , `vw` , `vh` , `vmin` , `vmax` , `cm` , `mm` , `q` , `in` , `pt` , `pc` , `px` , `deg` , `grad` , `rad` , `turn` , `s` , `ms` , `Hz` , `kHz` , `dpi` , `dpcm` , `dppx`

```javascript
import { dimension } from 'bredon-types'

dimension(integer(300), 'px') // => 30px
dimension(float(33, 33, true), '%') // => -33.33%
```

## `expression(body: Array<node>)`

```javascript
import { expression } from 'bredon-types'

expression([ /* child nodes */ ])
```

## `float(integer: number, fractional: number, isNegative?: boolean = false)`

```javascript
import { float } from 'bredon-types'

float(0, 55) // => .55
float(1, 10, true) // => -1.10
```

## `functionExpression(callee: string, params: Array<node>)`

```javascript
import { functionExpression } from 'bredon-types'

functionExpression('rgba', [ /* param nodes */ ]) // => rgba(...)
```

## `hexColor(color: string)`

```javascript
import { hexColor } from 'bredon-types'

hexColor('FFF') // => #FFF
```

## `identifier(name: string)`

```javascript
import { identifier } from 'bredon-types'

identifier('solid') // => solid
```

## `integer(value: number, isNegative?: boolean = false)`

```javascript
import { integer } from 'bredon-types'

integer(55) // => 55
integer(55, true) // => -55
```

## `operator(sign: '+' | '-' | '/' | '*')`

```javascript
import { operator } from 'bredon-types'

operator('+') // => +
```

## `parenthesis(paren: '(' | ')')`

```javascript
import { parenthesis } from 'bredon-types'

parenthesis('(') // => (
```

## `seperator()`

```javascript
import { seperator } from 'bredon-types'

seperator() // => /
```

## `stringLiteral(str: string, quote?: '"' | "'" = "'")`

```javascript
import { stringLiteral } from 'bredon-types'

stringLiteral("Hello, I am a string.", '"') // => "Hello, I am a string."
```

## `url(uri: string)`

```javascript
import { url } from 'bredon-types'

url("https://www.github.com/") // => url("https://www.github.com/") 
```

## `value(body: Array<node>, isImportant?: boolean = false)`

```javascript
import { cssValue } from 'bredon-types'

value([ /* child nodes */ ])
value([ /* child nodes */ ], true)
```

## `valueList(body: Array<value>)`

```javascript
import { valueList } from 'bredon-types'

valueList([ /* value nodes */])
```