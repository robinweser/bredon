import Parser from '../Parser'

describe('Parsing CSS values', () => {
  it('should correctly parse Identifiers', () => {
    const parser = new Parser()

    expect(parser.parse('flex-start')).toEqual({
      body: [
        {
          type: 'Identifier',
          value: 'flex-start'
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly parse Integers', () => {
    const parser = new Parser()

    expect(parser.parse('400')).toEqual({
      body: [
        {
          type: 'Integer',
          value: 400
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly parse algebraic signs', () => {
    const parser = new Parser()

    expect(parser.parse('-400')).toEqual({
      body: [
        {
          type: 'Integer',
          value: 400,
          negative: true
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly parse Parentheses', () => {
    const parser = new Parser()

    expect(parser.parse('(')).toEqual({
      body: [
        {
          type: 'Parenthesis',
          value: '('
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly parse HexColors', () => {
    const parser = new Parser()

    expect(parser.parse('#66FF66')).toEqual({
      body: [
        {
          type: 'HexColor',
          value: '#66FF66'
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly parse StringLiterals', () => {
    const parser = new Parser()

    expect(parser.parse('"hello, it\'s me."')).toEqual({
      body: [
        {
          type: 'StringLiteral',
          quote: '"',
          value: "hello, it's me."
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly parse Dimensions', () => {
    const parser = new Parser()

    expect(parser.parse('300px')).toEqual({
      body: [
        {
          type: 'Dimension',
          unit: 'px',
          value: {
            type: 'Integer',
            value: 300
          }
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly parse Float', () => {
    const parser = new Parser()

    expect(parser.parse('200.55')).toEqual({
      body: [
        {
          type: 'Float',
          fractional: {
            type: 'Integer',
            value: 55
          },
          integer: {
            type: 'Integer',
            value: 200
          }
        }
      ],
      type: 'CSSValue'
    })

    expect(parser.parse('-.55')).toEqual({
      body: [
        {
          type: 'Float',
          integer: {
            type: 'Integer',
            value: 0,
            negative: true
          },
          fractional: {
            type: 'Integer',
            value: 55
          }
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly parse FunctionExpressions', () => {
    const parser = new Parser()

    expect(parser.parse('rgba(200,300)')).toEqual({
      body: [
        {
          type: 'FunctionExpression',
          callee: {
            type: 'Identifier',
            value: 'rgba'
          },
          params: [
            {
              type: 'Integer',
              value: 200
            },
            {
              type: 'Integer',
              value: 300
            }
          ]
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly parse URLs', () => {
    const parser = new Parser()

    expect(
      parser.parse(
        'url(https://www.google.de/request#something?param=true&foo=bar%20)'
      )
    ).toEqual({
      body: [
        {
          type: 'FunctionExpression',
          callee: {
            type: 'Identifier',
            value: 'url'
          },
          params: [
            {
              type: 'URL',
              value:
                'https://www.google.de/request#something?param=true&foo=bar%20'
            }
          ]
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly parse Expressions', () => {
    const parser = new Parser()

    expect(parser.parse('calc(100%+5/2)')).toEqual({
      body: [
        {
          type: 'FunctionExpression',
          callee: {
            type: 'Identifier',
            value: 'calc'
          },
          params: [
            {
              type: 'Expression',
              body: [
                {
                  type: 'Dimension',
                  unit: '%',
                  value: {
                    type: 'Integer',
                    value: 100
                  }
                },
                {
                  type: 'Operator',
                  value: '+'
                },
                {
                  type: 'Integer',
                  value: 5
                },
                {
                  type: 'Operator',
                  value: '/'
                },
                {
                  type: 'Integer',
                  value: 2
                }
              ]
            }
          ]
        }
      ],
      type: 'CSSValue'
    })
  })

  it('should correctly skip whitespaces', () => {
    const parser = new Parser()

    expect(parser.parse('300 400   700')).toEqual({
      body: [
        {
          type: 'Integer',
          value: 300
        },
        {
          type: 'Integer',
          value: 400
        },
        {
          type: 'Integer',
          value: 700
        }
      ],
      type: 'CSSValue'
    })

    expect(
      parser.parse(
        ' 1px   inherit rgba( 255  , 94 ,  0.34 ) , 300ms all linear '
      )
    ).toEqual({
      type: 'MultiValue',
      body: [
        {
          type: 'CSSValue',
          body: [
            {
              type: 'Dimension',
              value: {
                type: 'Integer',
                value: 1
              },
              unit: 'px'
            },
            {
              type: 'Keyword',
              value: 'inherit'
            },
            {
              type: 'FunctionExpression',
              callee: {
                type: 'Identifier',
                value: 'rgba'
              },
              params: [
                {
                  type: 'Integer',
                  value: 255
                },
                {
                  type: 'Integer',
                  value: 94
                },
                {
                  type: 'Float',
                  fractional: {
                    type: 'Integer',
                    value: 34
                  },
                  integer: {
                    type: 'Integer',
                    value: 0
                  }
                }
              ]
            }
          ]
        },
        {
          type: 'CSSValue',
          body: [
            {
              type: 'Dimension',
              unit: 'ms',
              value: {
                type: 'Integer',
                value: 300
              }
            },
            {
              type: 'Identifier',
              value: 'all'
            },
            {
              type: 'Identifier',
              value: 'linear'
            }
          ]
        }
      ]
    })
  })

  // complex test
  it('should return a correct AST', () => {
    const parser = new Parser()

    expect(
      parser.parse('1px inherit rgba(255, 94, 0.34), 300ms all linear')
    ).toEqual({
      type: 'MultiValue',
      body: [
        {
          type: 'CSSValue',
          body: [
            {
              type: 'Dimension',
              value: {
                type: 'Integer',
                value: 1
              },
              unit: 'px'
            },
            {
              type: 'Keyword',
              value: 'inherit'
            },
            {
              type: 'FunctionExpression',
              callee: {
                type: 'Identifier',
                value: 'rgba'
              },
              params: [
                {
                  type: 'Integer',
                  value: 255
                },
                {
                  type: 'Integer',
                  value: 94
                },
                {
                  type: 'Float',
                  fractional: {
                    type: 'Integer',
                    value: 34
                  },
                  integer: {
                    type: 'Integer',
                    value: 0
                  }
                }
              ]
            }
          ]
        },
        {
          type: 'CSSValue',
          body: [
            {
              type: 'Dimension',
              unit: 'ms',
              value: {
                type: 'Integer',
                value: 300
              }
            },
            {
              type: 'Identifier',
              value: 'all'
            },
            {
              type: 'Identifier',
              value: 'linear'
            }
          ]
        }
      ]
    })
  })
})
