# `minify(property, value)`

Minifies a CSS value as much as possible.

## Arguments
1. `property` (*string*): The CSS property name *(in camelCase)*
2. `value` (*string*): The CSS value that should be minified

## Returns
(*string*) The minified CSS value

## Example

```javascript
import minify from 'bredon-minify'

minify('borderLeft', '2px  hsl(calc( 100/2 + 10*3 ),  50% , 20%)')
// => 2px #3B4D19

minify('fontSize', '12.5555px')
// => 12.56px
```