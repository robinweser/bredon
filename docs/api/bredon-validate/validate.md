# `validate(property, value)`

Validates a CSS declaration using type-checking.

## Arguments
1. `property` (*string*): The CSS property that should be validated *(in camelCase)*
2. `value` (*string*): The CSS value that is parsed and type-checked

## Returns
(*boolean*) Indicator if the declaration is valid or invalid

## Example

```javascript
import validate from 'bredon-validate'

validate('borderLeft', '1px solid rgba(100, 200, 50, .55)')
// => true

validate('borderLeft', '1px 2px rgba(100, 200, 50, .55)')
// => false
```
