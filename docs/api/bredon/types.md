# Types

Bredon exports `bredon-types` as `types`.
If you've already installed `bredon`, you do not need to install `bredon-types` separately.

```javascript
import { types } from 'bredon' 

const node = types.integer(3, true)
// => { type: 'Integer', value: 3, negative: true }

types.isInteger(node)
// => true
```