/* @flow */
import type { AST } from '../../../flowtypes/AST'

import Parser from './Parser'
import Traverser from './traverser'
import Generator from './generator'

type TransformOptions = {
  visitors?: Object,
  generators?: Object
}

function parse(input: string): AST {
  const parser = new Parser()
  return parser.parse(input)
}

function generate(ast: AST, generators: Object = {}): string {
  const generator = new Generator(generators)
  return generator.generate(ast)
}

function traverse(ast: AST, visitors: Object = {}): void {
  const traverser = new Traverser(visitors)
  return traverser.traverse(ast)
}

function transform(input: string): string {
  return generate(traverse(parse(input)))
}

export { parse, generate, traverse, transform }
