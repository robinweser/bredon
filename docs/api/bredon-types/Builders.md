# Builders

For every AST node, the `bredon-types` package also ships a builder function which safely creates AST nodes manually.

* [cssValue](#cssvaluebody-arraynode)
* [dimension](#dimensionvalue-number-unit-string)
* [expression](#expressionbody-arraynode)
* [float](#float)
* [functionExpression]()
* [hexColor]()
* [identifier]()
* [important]()
* [integer]()
* [keyword]()
* [multiValue]()
* [operator]()
* [parenthesis]()
* [separator]()
* [stringLiteral]()
* [url]()

##### `cssValue(body: Array<node>)`

```javascript
import { cssValue } from 'bredon-types'

cssValue([ /* child nodes */ ])
```

##### `dimension(value: number, unit: Unit)`

where Unit refers to one of the validunits:<br>
`%` | `em` | `ex`  | `ch`  | `rem`  | `vw`  | `vh`  | `vmin`  | `vmax`  | `cm`  | `mm`  | `q`  | `in`  | `pt`  | `pc`  | `px`  | `deg`  | `grad`  | `rad`  | `turn`  | `s`  | `ms`  | `Hz`  | `kHz`  | `dpi`  | `dpcm`  | `dppx`

```javascript
import { dimension } from 'bredon-types'

dimension(300, 'px')
```

##### `expression(body: Array<node>)`

```javascript
import { expression } from 'bredon-types'

expression([ /* child nodes */ ])
```

##### `float(integer: number, fractional: number, isNegative?: boolean = false)`

```javascript
import { float } from 'bredon-types'

float(0, 55)
float(1, 10, true)
```

##### `functionExpression(callee: string, params: Array<node>)`

```javascript
import { functionExpression } from 'bredon-types'

functionExpression('rgba', [ /* param nodes */ ])
```

##### `hexColor(color: string)`

```javascript
import { hexColor } from 'bredon-types'

hexColor('#FFF')
```

##### `identifier(name: string)`

```javascript
import { identifier } from 'bredon-types'

identifier('solid')
```

##### `important()`

```javascript
import { important } from 'bredon-types'

important()
```

##### `integer(value: number)`

```javascript
import { integer } from 'bredon-types'

integer(55)
```

##### `keyword(word: 'inherit' | 'initial' | 'unset')`

```javascript
import { keyword } from 'bredon-types'

keyword('inherit')
```


##### `multiValue(body: Array<cssValue>)`

```javascript
import { multiValue } from 'bredon-types'

multiValue([ /* at least 2 cssValue nodes */])
```

##### `operator(sign: '+' | '-' | '/' | '*')`

```javascript
import { operator } from 'bredon-types'

operator('+')
```

##### `parenthesis(paren: '(' | ')')`

```javascript
import { parenthesis } from 'bredon-types'

parenthesis('(')
```

##### `seperator()`

```javascript
import { seperator } from 'bredon-types'

seperator()
```

##### `stringLiteral(str: string, quote?: '"' | "'" = "'")`

```javascript
import { stringLiteral } from 'bredon-types'

stringLiteral("Hello, I am a string.", '"')
```

##### `url(uri: string)`

```javascript
import { url } from 'bredon-types'

url("https://www.github.com/")
```
