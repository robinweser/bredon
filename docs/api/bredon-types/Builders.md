# Builders

For every AST node, the `bredon-types` package also ships a builder function which safely creates AST nodes manually.

* [dimension](#dimensionvalue-number-unit-unit)
* [expression](#expressionbody-arraynode)
* [float](#floatinteger-number-fractional-number-isnegative-boolean--false)
* [functionExpression](#functionexpressioncallee-string-params-arraynode)
* [hexColor](#hexcolorcolor-string)
* [identifier](#identifiername-string)
* [integer](#integervalue-number)
* [operator](#operatorsign--------)
* [parenthesis](#parenthesisparen--)
* [separator](#separator)
* [stringLiteral](#stringliteralstr-string-quote-----)
* [url](#urluri-string)
* [value](#valuebody-arraynode)
* [valueList](#valuelistbody-arraycssvalue)

### `dimension(value: number, unit: Unit)`

where Unit refers to one of the validunits:<br>
`%` | `em` | `ex`  | `ch`  | `rem`  | `vw`  | `vh`  | `vmin`  | `vmax`  | `cm`  | `mm`  | `q`  | `in`  | `pt`  | `pc`  | `px`  | `deg`  | `grad`  | `rad`  | `turn`  | `s`  | `ms`  | `Hz`  | `kHz`  | `dpi`  | `dpcm`  | `dppx`

```javascript
import { dimension } from 'bredon-types'

dimension(300, 'px')
```

### `expression(body: Array<node>)`

```javascript
import { expression } from 'bredon-types'

expression([ /* child nodes */ ])
```

### `float(integer: number, fractional: number, isNegative?: boolean = false)`

```javascript
import { float } from 'bredon-types'

float(0, 55)
float(1, 10, true)
```

### `functionExpression(callee: string, params: Array<node>)`

```javascript
import { functionExpression } from 'bredon-types'

functionExpression('rgba', [ /* param nodes */ ])
```

### `hexColor(color: string)`

```javascript
import { hexColor } from 'bredon-types'

hexColor('FFF')
```

### `identifier(name: string)`

```javascript
import { identifier } from 'bredon-types'

identifier('solid')
```

##### `integer(value: number, isNegative?: boolean)`

```javascript
import { integer } from 'bredon-types'

integer(55)
integer(55, true)
```

### `operator(sign: '+' | '-' | '/' | '*')`

```javascript
import { operator } from 'bredon-types'

operator('+')
```

##### `parenthesis(paren: '(' | ')')`

```javascript
import { parenthesis } from 'bredon-types'

parenthesis('(')
```

### `seperator()`

```javascript
import { seperator } from 'bredon-types'

seperator()
```

### `stringLiteral(str: string, quote?: '"' | "'" = "'")`

```javascript
import { stringLiteral } from 'bredon-types'

stringLiteral("Hello, I am a string.", '"')
```

### `url(uri: string)`

```javascript
import { url } from 'bredon-types'

url("https://www.github.com/")
```

### `value(body: Array<node>, isImportant?: boolean = false)`

```javascript
import { cssValue } from 'bredon-types'

value([ /* child nodes */ ])
value([ /* child nodes */ ], true)
```

### `valueList(body: Array<value>)`

```javascript
import { valueList } from 'bredon-types'

valueList([ /* value nodes */])
```