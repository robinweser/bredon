import { compile } from 'bredon'

import precisionPlugin from '../index'

describe('Using the precision plugin', () => {
  it('should reduce precision', () => {
    expect(
      compile('2.123456', {
        plugins: [precisionPlugin()],
      })
    ).toBe('2.1235')
  })

  it('should reduce precision using a custom precision', () => {
    expect(
      compile('2.123456', {
        plugins: [
          precisionPlugin({
            precision: 2,
          }),
        ],
      })
    ).toBe('2.12')
  })

  it('should keep low precision', () => {
    expect(
      compile('2.1', {
        plugins: [precisionPlugin()],
      })
    ).toBe('2.1')
  })
})
