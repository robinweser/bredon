import { compile } from 'bredon'

import unitPlugin from '../index'

describe('Using the unit plugin', () => {
  it('should normalize units', () => {
    expect(
      compile('12pt 0.25turn 3s 15px 2.53cm', {
        plugins: [unitPlugin()],
      })
    ).toBe('16px 90deg 3000ms 15px 95.622px')
  })

  it('should normalize units with custom format and precision', () => {
    expect(
      compile('12pt 0.25turn 3s 15px 2.53cm', {
        plugins: [
          unitPlugin({
            formats: {
              length: 'mm',
              angle: 'grad',
              time: 's',
            },
            precision: 2,
          }),
        ],
      })
    ).toBe('4.23mm 100grad 3s 3.97mm 25.3mm')
  })
})
