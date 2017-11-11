import { compile } from 'bredon'

import colorPlugin from '../index'

describe('Using the color plugin', () => {
  it('should normalize color values to hex colors', () => {
    expect(
      compile('1px solid rgb(100, 100, 200)', {
        plugins: [colorPlugin()],
      })
    ).toBe('1px solid #6464C8')
  })

  it('should normalize color values to hsl', () => {
    expect(
      compile('1px solid rgba(100, 100, 200, 0.55)', {
        plugins: [colorPlugin({ format: 'hsl' })],
      })
    ).toBe('1px solid hsla(240,47.6%,58.8%,.55)')
  })

  it('should normalize color values to rgb', () => {
    expect(
      compile('1px solid #FFFFFF', {
        plugins: [colorPlugin({ format: 'rgb' })],
      })
    ).toBe('1px solid rgb(255,255,255)')
  })

  it('should normalize named colors to hex', () => {
    expect(
      compile('1px solid red', {
        plugins: [colorPlugin({ format: 'rgb' })],
      })
    ).toBe('1px solid rgb(255,0,0)')
  })
})
