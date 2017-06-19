import Generator from '../Generator'

describe('Generating a string from an AST', () => {
  it('should return a pretty strings', () => {
    const generator = new Generator()

    expect(
      generator.generate({
        body: [
          {
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
                    integer: {
                      type: 'Integer',
                      value: 0
                    },
                    fractional: {
                      type: 'Integer',
                      value: 34
                    }
                  }
                ]
              }
            ],
            type: 'CSSValue'
          },
          {
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
            ],
            type: 'CSSValue'
          }
        ],
        type: 'MultiValue'
      })
    ).toBe('1px inherit rgba(255,94,.34),300ms all linear')
  })

  it('should use custom formatters', () => {
    const generator = new Generator({
      FunctionExpression: (node, generate) =>
        `${node.callee}(${node.params.map(generate).join(' , ')})`
    })

    expect(
      generator.generate({
        type: 'CSSValue',
        body: [
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
                value: 0
              },
              {
                type: 'Integer',
                value: 255
              },
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
            ]
          }
        ]
      })
    ).toBe('rgba(255 , 0 , 255 , -.55)')
  })
})
