/* @flow */
import type { AST } from '../../../flowtypes/AST'
import type { ParsedCSSValue } from '../../../flowtypes/ParsedCSSValue'

import Parser from './parser'
import Traverser from './traverser'
import Generator from './generator'

export function parse(input: string): ParsedCSSValue {
  const parser = new Parser()
  const ast = parser.parse(input)

  return {
    toString(formatters: Object = {}): string {
      const generator = new Generator(formatters)
      return generator.generate(ast) || ''
    },
    toAST(): AST {
      return ast
    },
    traverse(visitors: Object = {}): void {
      const traverser = new Traverser(visitors)
      traverser.traverse(ast)
    }
  }
}
