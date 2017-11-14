# bredon-plugin-color

<img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-color.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon-plugin-color.svg">

The color plugin is, as the name hints, all about modifying CSS color values. It can transform values into different color formats.

Supported color formats are:  
* hex *(`#ffffff`)*
* rgb *(`rgb(255, 0, 255)`, `rgba(255, 0, 255, 0.55))*
* hsl *(`hsl(100, 100%, 50%)`, `hsla(100, 50%, 50%, 0.55))*

It can also process color names e.g. `white`, but will not output those.

## Installation
```sh
yarn add bredon-plugin-color
```
You may alternatively use `npm i --save bredon-plugin-color`.

## Usage

```javascript
import { compile } from 'bredon'
import colorPlugin from 'bredon-plugin-color'

const input = '1px solid white'

const output = compile(input, {
  plugins: [ 
    colorPlugin()
  ]
})

console.log(output)
// => 1px solid #ffffff
```

### Configuration
By default the plugin transforms every color value to the hex color format.<br>
You can pass a custom color format with an options object.

| Options | Value | Default | Description |
| ------- | ----- | ------- | ----------- |
| preserveAlpha  | *boolean* | true | Values with alpha won't be transformed to `hex` |
| format  | `hex`, `rgb`, `hsl` | `hex` | The output color format |

```javascript
import { compile } from 'bredon'
import colorPlugin from 'bredon-plugin-color'

const color = colorPlugin({
  format: 'rgb'
})

const input = '1px solid white'

const output = compile(input, {
  plugins: [ color ]
})

console.log(output)
// => 1px solid rgb(255, 255, 255)
```

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
