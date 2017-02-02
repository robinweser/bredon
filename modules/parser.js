/* @flow */
import type Token from '../flowtypes/Token'
import type AST from '../flowtypes/AST'

export default function parse(tokens: Array<Token>): AST {
  let currentPosition: number = 0

  function walk() {
    let token: Token = tokens[currentPosition]

    if (token.type === 'number') {
      ++currentPosition

      return {
        type: 'NumberLiteral',
        value: token.value
      }
    }

    if (token.type === 'identifier') {
      ++currentPosition

      return {
        type: 'Identifier',
        value: token.value
      }
    }

    if (token.type === 'single-start') {
      token = tokens[++currentPosition]

      const node = {
        type: 'SingleValue',
        nodes: []
      }

      while (token.type !== 'single-end') {
        node.nodes.push(walk())
        token = tokens[currentPosition]
      }

      ++currentPosition
      return node
    }

    if (token.type === 'value-start') {
      token = tokens[++currentPosition]

      const node = {
        type: 'MultiValue',
        nodes: []
      }

      while (token.type !== 'value-end') {
        const innerNode = walk()

        if (innerNode.nodes.length > 0) {
          node.nodes.push(innerNode)
        }
        token = tokens[currentPosition]
      }

      ++currentPosition
      return node
    }

    throw new TypeError(token.type)
  }

  const ast = {
    type: 'CSSValue',
    body: []
  }

  while (currentPosition < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}



function isNumber(char) {
  return /[0-9]/.test(char)
}

function isWhiteSpace(char) {
  return char === ' '
}

function isLetter(char) {
  return char !== undefined && /[a-z]/i.test(char)
}

function isComma(char) {
  return char === ','
}

export default function tokenize(input: string): Array<Token> {
  let currentPosition: number = 0
  const tokens: Array<Token> = []

  tokens.push({ type: 'value-start' })
  tokens.push({ type: 'single-start' })

  while (currentPosition < input.length) {
    let char: string = input[currentPosition]

    if (isComma(char)) {
      tokens.push({ type: 'single-end' })
      tokens.push({ type: 'value-end' })
      tokens.push({ type: 'value-start' })
      tokens.push({ type: 'single-start' })

      ++currentPosition
      continue
    }

    // check for whitespace
    if (isWhiteSpace(char)) {
      while (isWhiteSpace(char)) {
        char = input[++currentPosition]
      }

      tokens.push({ type: 'single-end' })
      tokens.push({ type: 'single-start' })

      continue
    }

    // check for numbers
    if (isNumber(char)) {
      let value: string = ''

      while (isNumber(char)) {
        value += char
        char = input[++currentPosition]
      }

      tokens.push({
        type: 'number',
        value
      })

      continue
    }

    // check for strings
    if (isLetter(char)) {
      let value: string = ''

      while (isLetter(char)) {
        value += char
        char = input[++currentPosition]
      }

      tokens.push({
        type: 'identifier',
        value
      })

      continue
    }

    throw new Error(`Unknown character: ${char} at position: ${currentPosition}`)
  }

  tokens.push({ type: 'single-end' })
  tokens.push({ type: 'value-end' })
  return tokens
}
