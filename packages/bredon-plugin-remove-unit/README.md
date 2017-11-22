# bredon-plugin-remove-unit

<img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-remove-unit.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon-plugin-remove-unit.svg">

The remove-unit plugin will remove unnecessary units from dimensions.<br>
It works for all units, not only pixel or length units.

## Installation
```sh
yarn add bredon-plugin-remove-unit
```
You may alternatively use `npm i --save bredon-plugin-remove-unit`.

## Usage

```javascript
import { compile } from 'bredon'
import removeUnitPlugin from 'bredon-plugin-remove-unit'

const input = '15px 0px 5px 0px'

const output = compile(input, {
  plugins: [ 
    removeUnitPlugin()
  ]
})

console.log(output)
// => 15px 0 5px 0
```

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
