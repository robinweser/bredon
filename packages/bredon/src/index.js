/* @flow */
import type { AST } from '../../../flowtypes/AST'

import Parser from './Parser'
import Traverser from './Traverser'
import Generator from './Generator'

type TransformOptions = {
  visitors?: Object,
  generators?: Object
}

export function parse(input: string): AST {
  const parser = new Parser()
  return parser.parse(input)
}

export function generate(ast: AST, generators?: Object = {}): string {
  const generator = new Generator(generators)
  return generator.generate(ast)
}

export function traverse(ast: AST, visitors: Object): void {
  const traverser = new Traverser(visitors)
  return traverser.traverse(ast)
}

export function compile(input: string, options: TransformOptions = {}): string {
  return generate(
    traverse(parse(input), options.visitors || {}),
    options.generators
  )
}
