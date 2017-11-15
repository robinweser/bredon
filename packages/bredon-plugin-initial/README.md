# bredon-plugin-initial

<img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-initial.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon-plugin-initial.svg">

The initial plugin replaces, normalizes and minifies initial values.
In order to replace the `initial` keyword, the associated CSS property is required within `context`.

## Installation
```sh
yarn add bredon-plugin-initial
```
You may alternatively use `npm i --save bredon-plugin-initial`.

## Usage

```javascript
import { compile } from 'bredon'
import initialPlugin from 'bredon-plugin-initial'

const input = 'initial'

const output = compile(input, {
  plugins: [ 
    initialPlugin()
  ],
  context: {
    property: 'paddingLeft'
  }
})

console.log(output)
// => 0
```

### Configuration
By default the plugin replaces all `initial` keywords.<br>
Using the `useShorter`, it will the one that's shorter in length.<br>
It may also replace values with the `initial` keyword if `useShorter` is used.

| Options | Value | Default | Description |
| ------- | ----- | ------- | ----------- |
| useShorter | *(boolean)* | `false` | If the shorter value should be used |

```javascript
import { compile } from 'bredon'
import colorPlugin from 'bredon-plugin-initial'

const input = 'initial'

const output = compile(input, {
  plugins: [ 
    initialPlugin({
      useShorter: true
    })
   ],
   context: {
     property: 'overflowClipBox'
   }
})

console.log(output)
// => initial
```

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
