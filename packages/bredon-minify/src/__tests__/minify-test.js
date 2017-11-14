import minify from '../index'

describe('Minifying CSS values', () => {
  it('should minify values as much as possible', () => {
    expect(
      minify(
        'border',
        '1px rgba(200, 200, 50, 0.5855), 2px hsl(calc(100/2 + 10*3), 50%, 20%)'
      )
    ).toBe('1px rgba(200,200,50,.59),2px #3B4D19')

    expect(minify('fontSize', '12.5555px')).toBe('12.56px')
  })
})
