import postcss from 'postcss'
import reporter from 'postcss-reporter'

import bredonValidate from '../index'

const css = `
.c1 {
  color: red;
  font-size: solid;
}
`

describe('Using the bredon-validate PostCSS plugin', () => {
  jest.spyOn(global.console, 'log')

  it('should warn on invalid values', done => {
    postcss([bredonValidate, reporter])
      .process(css)
      .then(result => {
        expect(result.css).toBe(css)
        expect(console.log).toBeCalled()
        done()
      })
  })
})
