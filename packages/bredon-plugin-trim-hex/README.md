# bredon-plugin-trim-hex

<img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-trim-hex.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon-plugin-trim-hex.svg">

The trim-hex plugin will minify hex color values if possible.

## Installation
```sh
yarn add bredon-plugin-trim-hex
```
You may alternatively use `npm i --save bredon-plugin-trim-hex`.

## Usage

```javascript
import { compile } from 'bredon'
import trimHexPlugin from 'bredon-plugin-trim-hex'

const input = '#FFFFFF #FAFAFA'

const output = compile(input, {
  plugins: [ 
    trimHexPlugin()
  ]
})

console.log(output)
// => #FFF #FAFAFA
```

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
