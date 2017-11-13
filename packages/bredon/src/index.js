/* @flow */
import * as types from 'bredon-types'

import Parser from './Parser'
import Traverser from './Traverser'
import Generator from './Generator'

import type { AST } from '../../../flowtypes/AST'

type TransformOptions = {
  plugins?: Array<Object>,
  generators?: Object,
  context?: Object,
}

function parse(input: string): AST {
  const parser = new Parser()
  return parser.parse(input)
}

function generate(ast: AST, generators?: Object = {}): string {
  const generator = new Generator(generators)
  return generator.generate(ast)
}

function traverse(
  ast: AST,
  visitors?: Array<Object> = [],
  context?: Object = {}
): void {
  const traverser = new Traverser(visitors, context)
  return traverser.traverse(ast)
}

function compile(input: string, options: TransformOptions = {}): string {
  return generate(
    traverse(parse(input), options.plugins, options.context),
    options.generators
  )
}

export { parse, generate, traverse, compile, types }
