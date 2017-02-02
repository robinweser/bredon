import createTokenizer from './tokenizer'

const tokenize = createTokenizer({
  length_unit: /^(px|em)$/,
  time_unit: /^((m)?s)$/,
  identifier: /^([a-z]|-)+$/i,
  number: /^\d+$/,
  floating_point: /^[.]$/,
  whitespace: /^\s+$/,
  paren: /^(\(|\))$/,
  comma: /^,+$/
})

console.log('Tokenizing: 34px solid grey, 300ms all cubic-bezier(12, 3.2, .5, 675.23)')
console.log('----------')
console.log(tokenize('34px solid grey, 300ms all cubic-bezier(12, 3.2, .5, 675.23)'))
