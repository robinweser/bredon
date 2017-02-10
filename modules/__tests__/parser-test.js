import Parser from '../parser'
import CSSValueRules from '../utils/CSSValueRules'

describe('Parsing CSS values', () => {
  it('should return a correct AST', () => {
    const parser = new Parser(CSSValueRules)

    expect(parser.parse('1px inherit rgba(255, 94, 0.34), 300ms all linear')).toEqual({
      body: [
        {
          type: 'UnitValue',
          value: '1',
          unit: 'px',
          unitType: 'absolute-length'
        },
        {
          type: 'Keyword',
          value: 'inherit'
        },
        {
          type: 'Function',
          callee: 'rgba',
          params: [
            {
              type: 'Integer',
              value: '255'
            },
            {
              type: 'Integer',
              value: '94'
            },
            {
              type: 'Float',
              integer: '0',
              fractional: '34'
            }
          ]
        },
        {
          type: 'Separator',
          value: ','
        },
        {
          type: 'UnitValue',
          unit: 'ms',
          unitType: 'duration',
          value: '300'
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
    })
  })
})
