/* @flow */
import type { AST } from '../flowtypes/AST'
import type { ParsedCSSValue } from '../flowtypes/ParsedCSSValue'

import Parser from './parser'
import Traverser from './traverser'
import Generator from './generator'

export default function parse(input: string): ParsedCSSValue {
  const parser = new Parser()
  const ast: AST = parser.parse(input)

  return {
    toString(): string {
      const generator = new Generator()
      return generator.generate(ast) || ''
    },
    toAST(): AST {
      return ast
    },
    traverse(visitors: Object): void {
      const traverser = new Traverser(visitors)
      traverser.traverse(ast)
    }
  }
}
