# Validators

For every AST node, the `bredon-types` package ships a validator function that simply checks the node type.

The following validators exist:
* isDimension
* isExpression
* isFloat
* isFunctionExpression
* isHexColor
* isIdentifier
* isInteger
* isOperator
* isParenthesis
* isSeparator
* isStringLiteral
* isUrl
* isValue
* isValueList

Each validator function takes a single AST node as first parameter and returns a boolean.

## Example
```javascript
import { isIdentifier, isHexColor } from 'bredon-types'

const ast = {
  type: 'HexColor',
  value: 'FFF'  
}

isIdentifier(ast) // => false
isHexColor(ast) // => true
```
