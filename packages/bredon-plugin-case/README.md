# bredon-plugin-case

<img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-case.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon-plugin-case.svg">

The case plugin normalizes the letter case for all identifier, hex color values, assigment names and units.<br>
It can either use lower-case or upper-case.

## Installation
```sh
yarn add bredon-plugin-case
```
You may alternatively use `npm i --save bredon-plugin-case`.

## Usage

```javascript
import { compile } from 'bredon'
import casePlugin from 'bredon-plugin-case'

const input = '1px SOLID AliceBlue'

const output = compile(input, {
  plugins: [ 
    casePlugin()
  ]
})

console.log(output)
// => 1px solid aliceblue
```

### Configuration
By default the plugin converts to lower-case.

| Options | Value | Default | Description |
| ------- | ----- | ------- | ----------- |
| case  | `lower`, `upper` | `lower` | The prefered case |

```javascript
import { compile } from 'bredon'
import casePlugin from 'bredon-plugin-case'

const input = '1px SOLID AliceBlue'

const output = compile(input, {
  plugins: [ 
    casePlugin({
      case: 'upper'
    })
  ]
})

console.log(output)
// => 1PX SOLID ALICEBLUE
```

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
