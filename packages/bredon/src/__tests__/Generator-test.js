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
                        value: 100,
                        unit: 'px',
                      },
                      {
                        type: 'Operator',
                        value: '/',
                      },
                      {
                        type: 'Integer',
                        value: 2,
                      },
                      {
                        type: 'Operator',
                        value: '+',
                      },
                      {
                        type: 'Dimension',
                        value: 5,
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
                    value: 255,
                  },
                  {
                    type: 'Integer',
                    value: 94,
                  },
                  {
                    type: 'Float',
                    integer: 0,
                    fractional: 34,
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
                value: 300,
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
    ).toBe('calc(100px/2 + 5px) inherit rgba(255,94,.34),300ms all linear')

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
                value: 255,
              },
              {
                type: 'Integer',
                value: 0,
              },
              {
                type: 'Integer',
                value: 255,
              },
              {
                type: 'Float',
                integer: 0,
                fractional: 55,
                negative: true,
              },
            ],
          },
        ],
      })
    ).toBe('rgba(255 , 0 , 255 , -.55)')
  })
})
