# bredon-plugin-unit

<img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-unit.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon-plugin-unit.svg">

The unit plugin will convert, normalize and minify unit values.

## Installation
```sh
yarn add bredon-plugin-unit
```
You may alternatively use `npm i --save bredon-plugin-unit`.

## Usage

```javascript
import { compile } from 'bredon'
import unitPlugin from 'bredon-plugin-unit'

const input = '12pt 0.25turn 3s 15px 2.53cm'

const output = compile(input, {
  plugins: [ 
    unitPlugin()
  ]
})

console.log(output)
// => 16px 90deg 3000ms 15px 95.622px
```

### Configuration
By default the output precision is `4`.<br>
The default unit formats are:

* length: `px`
* time: `ms`
* angle: `deg`

| Options | Value | Default | Description |
| ------- | ----- | ------- | ----------- |
| precision  | *number* | 4 | The prefered precision |
| formats  | *Object* | `{ length: 'px', time: 'ms', angle: 'deg' }` | The prefered unit formats |

```javascript
import { compile } from 'bredon'
import unitPlugin from 'bredon-plugin-unit'

const input = '12pt 0.25turn 3s 15px 2.53cm'

const output = compile(input, {
  plugins: [ 
    unitPlugin({
       precision: 2,
       formats: {
        length: 'mm',
        angle: 'grad',
        time: 's',
      }         
    })
  ]
})

console.log(output)
// => 4.23mm 100grad 3s 3.97mm 25.3mm
```

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
