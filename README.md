# Bredon

Bredon is a modern CSS value compiler in JavaScript.<br>
It uses very detailed nodes and provides as much information as possible for each value.<br>
You may also use it to transform the AST and generate new CSS values.

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/bredon.svg?branch=master"> <a href="https://codeclimate.com/github/rofrischmann/bredon/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/bredon/badges/coverage.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/bredon.svg"> <img alt="npm version" src="https://badge.fury.io/js/bredon.svg"> <a href="https://gitter.im/rofrischmann/bredon"><img alt="Gitter" src="https://img.shields.io/gitter/room/rofrischmann/bredon.svg"></a>


## Support Us
Support Robin Frischmann's work on Fela and its ecosystem (Bredon) directly via [**Patreon**](https://www.patreon.com/rofrischmann).

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

## Why?
I am heavily involved in the whole CSS-in-JS movement with [Fela](https://github.com/rofrischmann/fela) and [Elodin](https://github.com/rofrischmann/react-look) as well as [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer). While writing Elodin, a plugin-based style object linter, I struggled to do complex value validation and related operations. Stuff like *"Is the property/value prefixed?"* or even *"Is it compatible with browser ...?"* has been pretty straightforward, but I couldn't really come up with a simple solution to correctly validate CSS values with all their complexity.<br>
Here, I made the decision to write a modern CSS value parser that provides the required degree of accuracy and detail - Bredon.

> Bredon also is a project to understand how compilers work. It's quite fascinating after you understand how simple they actually are.

## How?
I heavily used [James Kyle](https://github.com/thejameskyle)'s [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler) to build Bredon. It follows the exact same steps as any other compiler does:

1. First of all we read the input, one by one, and generate tokens
2. Then we parse these tokens into syntactic nodes, also know as AST ([Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree))
3. *(optional)* We may now traverse the AST and transform nodes
4. Finally we generate a new CSS value using the transformed AST

## The Gist
```javascript
import { parse, generate } from 'bredon'

const input = '10px solid rgba(255, 0, 255, 0.55)'
const ast = parse(input)

ast === {
  type: 'CSSValue'
  body: [{
    type: 'Dimension',
    value: 10,
    unit: 'px'
  }, {
    type: 'Identifier',
    value: 'solid'
  }, {
    type: 'Function',
    callee: 'rgba',
    params: [{
      type: 'Integer',
      value: 255
    }, {
      type: 'Integer',
      value: 0
    }, {
      type: 'Integer',
      value: 255
    }, {
      type: 'Float',
      integer: 0,
      fractional: 55
    }]
  }]
}

const output = generate(ast)

console.log(output)
// => 10px solid rgba(255,0,255,.55)
```
## Documentation
* [**API Reference**](docs/API.md)
  * bredon
    * [parse](docs/api/bredon/parse.md)
    * [traverse](docs/api/bredon/traverse.md)
    * [generate](docs/api/bredon/generate.md)
    * [compile](docs/api/bredon/compile.md)
  * bredon-types
    * [Validators](docs/api/bredon-types/Validators.md)
    * [Builders](docs/api/bredon-types/Builders.md)
* [**AST Nodes**](docs/ASTNodes.md)
  * [Identifier](docs/ASTNodes.md#identifier)
  * [Integer](docs/ASTNodes.md#integer)
  * [Keyword](docs/ASTNodes.md#keyword)
  * [Important](docs/ASTNodes.md#important)
  * [Operator](docs/ASTNodes.md#operator)
  * [HexColor](docs/ASTNodes.md#hexcolor)
  * [Parenthesis](docs/ASTNodes.md#parenthesis)
  * [URL](docs/ASTNodes.md#url)
  * [StringLiteral](docs/ASTNodes.md#stringliteral)
  * [Dimension](docs/ASTNodes.md#dimension)
  * [Float](docs/ASTNodes.md#float)
  * [FunctionExpression](docs/ASTNodes.md#functionExpression)
  * [Expression](docs/ASTNodes.md#expression)


## Support
Join us on [Gitter](https://gitter.im/rofrischmann/bredon). <br>
We highly appreciate any contribution.<br>
We also love to get feedback.

## License
Bredon is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/pCQU3wY7qzomx7oGR27YYg5s/rofrischmann/bredon'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/pCQU3wY7qzomx7oGR27YYg5s/rofrischmann/bredon.svg' /></a>
