import { compile } from 'bredon'

import colorPlugin from '../index'

describe('Using the color plugin', () => {
  it('should normalize all color values to hex colors', () => {
    expect(
      compile('1px solid rgb(100, 100, 200)', {
        plugins: [colorPlugin()]
      })
    ).toBe('1px solid #6464C8')
  })
})
