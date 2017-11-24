# Bredon

Bredon is a modern, specification-driven CSS value compiler in JavaScript.<br>
It's parser uses very detailed nodes and provides as much information as possible.<br>
The generated AST ([Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)) is simple and readable which allows efficient and straight-forward transormation. It automatically outputs formatted CSS values.

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/bredon.svg?branch=master"> <a href="https://codeclimate.com/github/rofrischmann/bredon/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/bredon/badges/coverage.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon.svg"> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-4.4kb-brightgreen.svg"> <img alt="npm version" src="https://badge.fury.io/js/bredon.svg"> <a href="https://gitter.im/rofrischmann/bredon"><img alt="Gitter" src="https://img.shields.io/gitter/room/rofrischmann/bredon.svg"></a>


## Support Us
Support Robin Frischmann's work on [Fela](https://github.com/rofrischmann/fela) and its ecosystem (Bredon) directly via [**Patreon**](https://www.patreon.com/rofrischmann).

Or support us on [**Open Collective**](https://opencollective.com/fela) to fund community work. This also includes Bredon as well.<br>
Thank you to all our backers!

<a href="https://opencollective.com/fela/backer/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/5/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/6/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/6/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/7/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/7/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/8/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/8/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/9/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/9/avatar.svg?requireActive=false"></a>

## Installation
```sh
yarn add bredon
```
Alternatively use `npm i --save bredon`.

## Why?
I am heavily involved in the whole CSS in JS movement with [Fela](https://github.com/rofrischmann/fela) and [Elodin](https://github.com/rofrischmann/elodin) as well as [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer). While writing Elodin, a plugin-based style object linter, I struggled to do complex value validation and value transformation. As CSS values are just plain strings, we do not have any meaningful types.<br>
But, in order to perform efficient validation and transformation, we have to parse CSS values into useful type-aware components. That's where Bredon joins the game. It uses a specification-driven value parser that provides the required degree of accuracy and detail.

> Bredon also serves as a personal project to learn and understand how compilers work.

## How?
I heavily used [James Kyle](https://github.com/thejameskyle)'s [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler) to build Bredon. It follows the exact same steps as any other compiler does:

1. First of all we read the input, one by one, and generate tokens
2. Then we parse these tokens into syntactic nodes, also know as AST
3. *(optional)* We may now traverse the AST and transform nodes
4. Finally we generate a new CSS value using the transformed AST

## The Gist
```javascript
import { parse, generate } from 'bredon'

const input = '10px solid rgba(255, 0, 255, 0.55)'
const ast = parse(input)

ast === {
  type: 'ValueList',
  body: [{
    type: 'Value',
    important: false,
    body: [{
      type: 'Dimension',
      unit: 'px',
      value: {
        type: 'Integer',
        negative: false,
        value: 10
      }
    }, {
      type: 'Identifier',
      value: 'solid'
    }, {
      type: 'FunctionExpression',
      callee: 'rgba',
      params: [{
        type: 'Integer',
        negative: false,
        value: 255
      }, {
        type: 'Integer',
        negative: false,
        value: 0
      }, {
        type: 'Integer',
        negative: true,
        value: 255
      }, {
        type: 'Float',
        negative: false,
        fractional: 0.55,
        integer: 0,
      }]
    }]
  }]
}

const output = generate(ast)

console.log(output)
// => 10px solid rgba(255, 0, 255, 0.55)

// parsing and generation can be combined
const output = compile(input)
```

## Documentation
* [**API Reference**](docs/API.md)
  * bredon
    * [parse](docs/api/bredon/parse.md)
    * [traverse](docs/api/bredon/traverse.md)
    * [generate](docs/api/bredon/generate.md)
    * [compile](docs/api/bredon/compile.md)
    * [types](docs/api/bredon/types.md)
  * bredon-types
    * [Validators](docs/api/bredon-types/Validators.md)
    * [Builders](docs/api/bredon-types/Builders.md)
  * bredon-validate
    * [validate](docs/api/bredon-validate/validate.md)
  * bredon-minify
    * [minify](docs/api/bredon-minify/minify.md)
* [**AST Nodes**](docs/Nodes.md)
  * [Identifier](docs/ASTNodes.md#identifier)
  * [Operator](docs/ASTNodes.md#operator)
  * [HexColor](docs/ASTNodes.md#hexcolor)
  * [Parenthesis](docs/ASTNodes.md#parenthesis)
  * [URL](docs/ASTNodes.md#url)
  * [StringLiteral](docs/ASTNodes.md#stringliteral)
  * [Assignment](docs/ASTNodes.md#assignment)
  * [Dimension](docs/ASTNodes.md#dimension)
  * [Integer](docs/ASTNodes.md#integer)
  * [Float](docs/ASTNodes.md#float)
  * [FunctionExpression](docs/ASTNodes.md#functionexpression)
  * [Expression](docs/ASTNodes.md#expression)

## Plugins
Bredon's most powerful part is its extendable plugin system.<br>
Plugins are used to analyze and transform AST nodes.

| Plugin | Version | Size | Description |
| ------ | ------- | ---- | ----------- |
| [calc](packages/bredon-plugin-calc) | <img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-calc.svg"> | <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-8.6kb-brightgreen.svg"> | Precalculate calc() expression as much as possible | 
| [case](packages/bredon-plugin-case) | <img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-case.svg"> | <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.31kb-brightgreen.svg"> | Normalize letter case for all identifiers |
| [color](packages/bredon-plugin-color) | <img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-color.svg"> | <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-7.9kb-brightgreen.svg"> | Manipulate, normalize and minify CSS color values | 
| [initial](packages/bredon-plugin-initial) | <img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-initial.svg"> | <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-2.6kb-brightgreen.svg"> | Replace, normalize and minify initial values | 
| [precision](packages/bredon-plugin-precision) | <img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-precision.svg"> | <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.27kb-brightgreen.svg"> | Normalize decimal number precision |
| [remove-unit](packages/bredon-plugin-remove-unit) | <img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-remove-unit.svg"> | <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.27kb-brightgreen.svg"> | Remove unnecessary value units |
| [trim-hex](packages/bredon-plugin-trim-hex) | <img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-trim-hex.svg"> | <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.21kb-brightgreen.svg"> | Minify hex color values if possible |
| [unit](packages/bredon-plugin-unit) | <img alt="npm version" src="https://badge.fury.io/js/bredon-plugin-unit.svg"> | <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.73kb-brightgreen.svg"> | Convert, normalize and minify unit values |

## Integrations
To use Bredon within your project, you will need to somehow integrate the compiler into your workflow.<br>
Currently, we support to options to do so. You can either use Bredon with your existing CSS codebase using [PostCSS](http://postcss.org).
For JavaScript-based styling solutions (CSS in JS), there is [Elodin](https://github.com/rofrischmann/elodin) which can be configured to auto-fix styles.

* [elodin](https://github.com/rofrischmann/elodin)
* [postcss-bredon](packages/postcss-bredon)

### PostCSS Stand-Alones
You can also use [bredon-minify](packages/bredon-minify) and [bredon-validate](packages/bredon-validate) as a stand-alone plugin for PostCSS:

* [postcss-bredon-minify](packages/postcss-bredon-minify)
* [postcss-bredon-validate](packages/postcss-bredon-validate)

## Support
Join us on [Gitter](https://gitter.im/rofrischmann/bredon). <br>
We highly appreciate any contribution.<br>
We also love to get feedback.

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/pCQU3wY7qzomx7oGR27YYg5s/rofrischmann/bredon'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/pCQU3wY7qzomx7oGR27YYg5s/rofrischmann/bredon.svg' /></a>
