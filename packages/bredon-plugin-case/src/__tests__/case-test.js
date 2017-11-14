import { compile } from 'bredon'

import casePlugin from '../index'

describe('Using the case plugin', () => {
  it('should normalize identifier case', () => {
    expect(
      compile('FOO bar Baz BuZ', {
        plugins: [casePlugin()],
      })
    ).toBe('foo bar baz buz')

    expect(
      compile('FOO bar Baz BuZ', {
        plugins: [
          casePlugin({
            case: 'upper',
          }),
        ],
      })
    ).toBe('FOO BAR BAZ BUZ')
  })
})
