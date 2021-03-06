# `compile(input, [options])`

Compile basically is shorthand and executes [`parse`](parse.md), [`traverse`](traverse.md) and [`generate`](generate.md) in exact order.

## Arguments
1. `input` (*string*): The CSS value that gets parsed
2. `options` (*Object?*): An object containing compilation options

 a list of `plugins` which basically are `visitors` (see [`traverse`](traverse.md)) and/or `generators` (see [`generate`](generate.md))

#### Options
| Option | Value | Default | Description |
| ------ | ----- | ------- | ----------- |
| plugins | (*Array?*) | `[]` | A list of `visitors` (see [`traverse`](traverse.md)) |
| generators | (*Object?*) | `{}` | An object containing node `generators` (see [`generate`](generate.md)) |
| context | (*Object?*) | `{}` | An object containing additional context information which is required by some plugins (see [`traverse`](traverse.md)) | 

## Returns
(*string*) transformed CSS value

## Example

```javascript
import { compile } from 'bredon'

const input = ' 1px solid   rgba(100   , 200, 50, 0.55 ) '

const visitor = {
  Float: {
    enter(path) {
      console.log(path.parent.callee)
      console.log(path.node)
      // transforming the fractional part of each float
      path.node.fractional += 0.5
    }

    exit(path) {
      console.log(path.node)
    }
  }
}

const plugins = [visitor]

const generators = {
  Function: (node, generate) =>
    `${node.callee}(${node.params.map(generate).join(' , ')})`
}

const output = compile(input, {
  generators,
  plugins
})
// => rgba
// => { type: 'Float', integer: 0, fractional: 0.55, negative: false }
// => { type: 'Float', integer: 0, fractional: 0.60, negative: false }

console.log(output)
// => '1px solid rgba(100 , 200 , 50 , 0.60)'
```
