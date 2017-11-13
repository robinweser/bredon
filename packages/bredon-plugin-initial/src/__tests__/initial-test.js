import { compile } from 'bredon'

import initialPlugin from '../index'

describe('Using inital plugin', () => {
  it('should replace the initial keyword with the acutal initial value', () => {
    expect(
      compile('initial', {
        plugins: [initialPlugin()],
        context: { property: 'paddingLeft' },
      })
    ).toBe('0')
  })

  it('should only replace the initial keyword if the actual initial value is shorter', () => {
    expect(
      compile('initial', {
        plugins: [
          initialPlugin({
            useShorter: true,
          }),
        ],
        context: { property: 'overflowClipBox' },
      })
    ).toBe('initial')
  })

  it('should replace any initial value with the initial keyword if its shorter', () => {
    expect(
      compile('padding-box', {
        plugins: [
          initialPlugin({
            useShorter: true,
          }),
        ],
        context: { property: 'overflowClipBox' },
      })
    ).toBe('initial')
  })
})
