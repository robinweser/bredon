# `isValidProperty(property, value)`

Validates a property by type-checking its value.

#### Arguments
1. `property` (*string*): The CSS property that should be validated
2. `value` (*string*): The CSS value that is parsed and type-checked

##### Returns
(*boolean*) Indicator if the property is valid or invalid

##### Example

```javascript
import { isValidProperty } from 'bredon-validate'

console.log(isValidProperty('borderLeft', '1px solid rgba(100, 200, 50, .55)'))
// => true
console.log(isValidProperty('borderLeft', '1px 2px rgba(100, 200, 50, .55)'))
// => false
```
