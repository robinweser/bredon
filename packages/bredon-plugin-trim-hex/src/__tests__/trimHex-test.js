import { compile } from 'bredon'

import trimHexPlugin from '../index'

describe('Using the trim-hex plugin', () => {
  it('should trim hex values', () => {
    expect(
      compile('#FFFFFF', {
        plugins: [trimHexPlugin()],
      })
    ).toBe('#FFF')
  })

  it('should not trim hex values', () => {
    expect(
      compile('#FGFGFG', {
        plugins: [trimHexPlugin()],
      })
    ).toBe('#FGFGFG')
  })
})
