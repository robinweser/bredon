# bredon-plugin-calc

<img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-calc.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon-plugin-calc.svg">

The calc plugin will precalculate all `calc()` expression within CSS values as much as possible.<br>

> **Note**: It cannot resolve mixed units e.g. `%` and `px`.

## Installation
```sh
yarn add bredon-plugin-calc
```
You may alternatively use `npm i --save bredon-plugin-calc`.

## Usage

```javascript
import { compile } from 'bredon'
import calcPlugin from 'bredon-plugin-calc'

const input = 'calc(100% - 2*30%) calc(100% - 50px)'

const output = compile(input, {
  plugins: [ 
    calcPlugin()
  ]
})

console.log(output)
// => 40% calc(100% - 50px)
```

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
