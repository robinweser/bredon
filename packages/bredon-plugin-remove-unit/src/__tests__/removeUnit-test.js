import { compile } from 'bredon'

import removeUnitPlugin from '../index'

describe('Using the remove-unit plugin', () => {
  it('should remove unnecessary units from values', () => {
    expect(
      compile('0px', {
        plugins: [removeUnitPlugin()],
      })
    ).toBe('0')

    expect(
      compile('15px 0px 2px 0px', {
        plugins: [removeUnitPlugin()],
      })
    ).toBe('15px 0 2px 0')
  })
})
