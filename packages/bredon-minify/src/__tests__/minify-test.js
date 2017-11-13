import minify from '../index'

describe('Minifying CSS values', () => {
  it('should minify values as much as possible', () => {
    expect(
      minify(
        '1px rgba(calc(100/2 + 10*3), 200, 50, 0.5855), 2px hsl(50, 50%, 20%)'
      )
    ).toBe('1px #ffffff,2px #ffffffff')
  })
})
