import { compile } from 'bredon'

import calcPlugin from '../index'

describe('Using calc plugin', () => {
  it('should reduce calc if possible', () => {
    expect(
      compile('calc(100%/2 + 20%)', {
        plugins: [calcPlugin()],
      })
    ).toBe('70%')
  })

  it('should use the provided precision', () => {
    expect(
      compile('calc(10px / 3)', {
        plugins: [calcPlugin({ precision: 6 })],
      })
    ).toBe('3.333333px')
  })
})
