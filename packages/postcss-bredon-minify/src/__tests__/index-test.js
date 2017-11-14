import postcss from 'postcss'

import bredonMinify from '../index'

const css = `.c1 {
  border: 2px hsl(calc(100/2 + 10*3), 50%, 20%);
  color: #FFFFFF;
  overflow-clip-box: padding-box;
  font-size: 12.5555px;
}`

describe('Using the bredon-minify PostCSS plugin', () => {
  it('should minify values', done => {
    postcss([bredonMinify])
      .process(css)
      .then(result => {
        expect(result.css).toBe(
          `.c1 {
  border: 2px #3B4D19;
  color: #FFF;
  overflow-clip-box: initial;
  font-size: 12.56px;
}`
        )
        done()
      })
  })
})
