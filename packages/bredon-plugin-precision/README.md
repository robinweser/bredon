# bredon-plugin-precision

<img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-precision.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon-plugin-precision.svg">

The precision plugin normalizes decimal number precision.<br>
It will automatically round up values.

## Installation
```sh
yarn add bredon-plugin-precision
```
You may alternatively use `npm i --save bredon-plugin-precision`.

## Usage

```javascript
import { compile } from 'bredon'
import precisionPlugin from 'bredon-plugin-precision'

const input = '33.3333333% solid rgba(10, 10, 10, 0.564)'

const output = compile(input, {
  plugins: [ 
    precisionPlugin()
  ]
})

console.log(output)
// => 33.3333% solid rgba(10, 10, 10, 0.564)
```

### Configuration
By default, the precision is set to `4`.

| Options | Value | Default | Description |
| ------- | ----- | ------- | ----------- |
| precision  | *number* | 4 | The prefered precision |

```javascript
import { compile } from 'bredon'
import precisionPlugin from 'bredon-plugin-precision'

const input = '33.3333333% solid rgba(10, 10, 10, 0.564)'

const output = compile(input, {
  plugins: [ 
    precisionPlugin({
      precision: 2
    })
  ]
})

console.log(output)
// => 33.3% solid rgba(10, 10, 10, 0.56)
```

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
