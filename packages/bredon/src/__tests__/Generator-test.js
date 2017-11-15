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
                type: 'FunctionExpression',
                callee: 'calc',
                params: [
                  {
                    type: 'Expression',
                    body: [
                      {
                        type: 'Dimension',
                        value: {
                          type: 'Integer',
                          negative: false,
                          value: 100,
                        },
                        unit: 'px',
                      },
                      {
                        type: 'Operator',
                        value: '/',
                      },
                      {
                        type: 'Integer',
                        negative: false,
                        value: 2,
                      },
                      {
                        type: 'Operator',
                        value: '+',
                      },
                      {
                        type: 'Dimension',
                        value: {
                          type: 'Integer',
                          negative: false,
                          value: 5,
                        },
                        unit: 'px',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'Identifier',
                value: 'inherit',
              },
              {
                type: 'FunctionExpression',
                callee: 'rgba',
                params: [
                  {
                    type: 'Integer',
                    negative: false,
                    value: 255,
                  },
                  {
                    type: 'Integer',
                    negative: false,
                    value: 94,
                  },
                  {
                    type: 'Float',
                    integer: 0,
                    fractional: 0.34,
                    negative: false,
                  },
                ],
              },
            ],
            type: 'Value',
          },
          {
            body: [
              {
                type: 'Dimension',
                unit: 'ms',
                value: {
                  type: 'Integer',
                  negative: false,
                  value: 300,
                },
              },
              {
                type: 'Identifier',
                value: 'all',
              },
              {
                type: 'Identifier',
                value: 'linear',
              },
            ],
            type: 'Value',
          },
        ],
        type: 'ValueList',
      })
    ).toBe('calc(100px/2 + 5px) inherit rgba(255, 94, 0.34), 300ms all linear')

    expect(
      generator.generate({
        type: 'Value',
        body: [
          {
            type: 'StringLiteral',
            value: "I'm a string.",
            quote: '"',
          },
        ],
      })
    ).toBe('"I\'m a string."')
  })

  it('should use custom formatters', () => {
    const generator = new Generator({
      FunctionExpression: (node, generate) =>
        `${node.callee}(${node.params.map(generate).join(' , ')})`,
    })

    expect(
      generator.generate({
        type: 'Value',
        body: [
          {
            type: 'FunctionExpression',
            callee: 'rgba',
            params: [
              {
                type: 'Integer',
                negative: false,
                value: 255,
              },
              {
                type: 'Integer',
                negative: false,
                value: 0,
              },
              {
                type: 'Integer',
                negative: true,
                value: 255,
              },
              {
                type: 'Float',
                integer: 0,
                fractional: 0.55,
                negative: true,
              },
            ],
          },
        ],
      })
    ).toBe('rgba(255 , 0 , -255 , -0.55)')
  })
})
