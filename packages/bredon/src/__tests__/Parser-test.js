import Parser from '../Parser'

describe('Parsing CSS values', () => {
  it('should correctly parse identifiers', () => {
    const parser = new Parser()

    expect(parser.parse('flex-start')).toEqual({
      body: [
        {
          type: 'Identifier',
          value: 'flex-start'
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly parse integers', () => {
    const parser = new Parser()

    expect(parser.parse('400')).toEqual({
      body: [
        {
          type: 'Integer',
          value: 400
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly parse !important', () => {
    const parser = new Parser()

    expect(parser.parse('!important')).toEqual({
      body: [],
      important: true,
      type: 'CSSValue'
    })
  })

  it('should correctly parse algebraic signs', () => {
    const parser = new Parser()

    expect(parser.parse('-400')).toEqual({
      body: [
        {
          type: 'Integer',
          value: -400
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly parse parentheses', () => {
    const parser = new Parser()

    expect(parser.parse('(')).toEqual({
      body: [
        {
          type: 'Parenthesis',
          value: '('
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly parse HexColors', () => {
    const parser = new Parser()

    expect(parser.parse('#66FF66')).toEqual({
      body: [
        {
          type: 'HexColor',
          value: '66FF66'
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly parse strings', () => {
    const parser = new Parser()

    expect(parser.parse('"hello, it\'s me."')).toEqual({
      body: [
        {
          type: 'StringLiteral',
          quote: '"',
          value: "hello, it's me."
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly parse dimensions', () => {
    const parser = new Parser()

    expect(parser.parse('300px')).toEqual({
      body: [
        {
          type: 'Dimension',
          unit: 'px',
          value: 300
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly parse floats', () => {
    const parser = new Parser()

    expect(parser.parse('200.55')).toEqual({
      body: [
        {
          type: 'Float',
          fractional: 55,
          integer: 200,
          negative: false
        }
      ],
      important: false,
      type: 'CSSValue'
    })

    expect(parser.parse('-.55')).toEqual({
      body: [
        {
          type: 'Float',
          integer: 0,
          fractional: 55,
          negative: true
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly parse function expressions', () => {
    const parser = new Parser()

    expect(parser.parse('rgba(200,300)')).toEqual({
      body: [
        {
          type: 'FunctionExpression',
          callee: 'rgba',
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
      important: false,
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
          callee: 'url',
          params: [
            {
              type: 'URL',
              value:
                'https://www.google.de/request#something?param=true&foo=bar%20'
            }
          ]
        }
      ],
      important: false,
      type: 'CSSValue'
    })
  })

  it('should correctly parse expressions', () => {
    const parser = new Parser()

    expect(parser.parse('calc(100%+5/2)')).toEqual({
      body: [
        {
          type: 'FunctionExpression',
          callee: 'calc',
          params: [
            {
              type: 'Expression',
              body: [
                {
                  type: 'Dimension',
                  unit: '%',
                  value: 100
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
      important: false,
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
      important: false,
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
          important: false,
          body: [
            {
              type: 'Dimension',
              value: 1,
              unit: 'px'
            },
            {
              type: 'Keyword',
              value: 'inherit'
            },
            {
              type: 'FunctionExpression',
              callee: 'rgba',
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
                  fractional: 34,
                  integer: 0,
                  negative: false
                }
              ]
            }
          ]
        },
        {
          type: 'CSSValue',
          important: false,
          body: [
            {
              type: 'Dimension',
              unit: 'ms',
              value: 300
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
          important: false,
          body: [
            {
              type: 'Dimension',
              value: 1,
              unit: 'px'
            },
            {
              type: 'Keyword',
              value: 'inherit'
            },
            {
              type: 'FunctionExpression',
              callee: 'rgba',
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
                  fractional: 34,
                  integer: 0,
                  negative: false
                }
              ]
            }
          ]
        },
        {
          type: 'CSSValue',
          important: false,
          body: [
            {
              type: 'Dimension',
              unit: 'ms',
              value: 300
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
