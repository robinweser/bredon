import createTokenizer from '../tokenizer'
import CSSValueRules from '../utils/CSSValueRules'

const tokenizeCSSValue = createTokenizer(CSSValueRules)

describe('Tokenizing CSS values', () => {
  it('should return an array of tokens', () => {
    expect(tokenizeCSSValue('1px solid black')).toEqual([
      {
        type: 'number',
        value: '1'
      },
      {
        type: 'absolute_length_unit',
        value: 'px'
      },
      {
        type: 'whitespace',
        value: ' '
      },
      {
        type: 'identifier',
        value: 'solid'
      },
      {
        type: 'whitespace',
        value: ' '
      },
      {
        type: 'identifier',
        value: 'black'
      }
    ])
  })

  it('should tokenize complex values', () => {
    expect(tokenizeCSSValue('1px solid black, 300ms  all cubic-bezier(1,0.23, 55.98, .05)')).toEqual([
      {
        type: 'number',
        value: '1'
      },
      {
        type: 'absolute_length_unit',
        value: 'px'
      },
      {
        type: 'whitespace',
        value: ' '
      },
      {
        type: 'identifier',
        value: 'solid'
      },
      {
        type: 'whitespace',
        value: ' '
      },
      {
        type: 'identifier',
        value: 'black'
      },
      {
        type: 'comma',
        value: ','
      },
      {
        type: 'whitespace',
        value: ' '
      },
      {
        type: 'number',
        value: '300'
      },
      {
        type: 'duration_unit',
        value: 'ms'
      },
      {
        type: 'whitespace',
        value: '  '
      },
      {
        type: 'identifier',
        value: 'all'
      },
      {
        type: 'whitespace',
        value: ' '
      },
      {
        type: 'identifier',
        value: 'cubic-bezier'
      },
      {
        type: 'paren',
        value: '('
      },
      {
        type: 'number',
        value: '1'
      },
      {
        type: 'comma',
        value: ','
      },
      {
        type: 'number',
        value: '0'
      },
      {
        type: 'floating_point',
        value: '.'
      },
      {
        type: 'number',
        value: '23'
      },
      {
        type: 'comma',
        value: ','
      },
      {
        type: 'whitespace',
        value: ' '
      },
      {
        type: 'number',
        value: '55'
      },
      {
        type: 'floating_point',
        value: '.'
      },
      {
        type: 'number',
        value: '98'
      },
      {
        type: 'comma',
        value: ','
      },
      {
        type: 'whitespace',
        value: ' '
      },
      {
        type: 'floating_point',
        value: '.'
      },
      {
        type: 'number',
        value: '05'
      },
      {
        type: 'paren',
        value: ')'
      }
    ])
  })

  it('should return an array of tokens', () => {
    expect(tokenizeCSSValue('#FF66f6')).toEqual([{
      type: 'hash',
      value: '#'
    }, {
      type: 'hexadecimal',
      value: 'FF66f6'
    }])
  })
})
