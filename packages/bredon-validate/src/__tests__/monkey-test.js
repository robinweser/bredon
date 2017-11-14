import path from 'path'
import fs from 'fs'

import postcss from 'postcss'
import reporter from 'postcss-reporter'
import bredonValidate from 'postcss-bredon-validate'

const fixturePath = '/__fixtures__/'

const fixtures = fs
  .readdirSync(path.join(__dirname, fixturePath))
  .reduce((fixureList, file) => {
    fixureList.push(path.join(__dirname, fixturePath, file))
    return fixureList
  }, [])

function processFile(filename, stop, done) {
  const css = fs.readFileSync(filename)

  postcss([bredonValidate, reporter])
    .process(css)
    .then(() => {
      if (stop) {
        expect(console.log).not.toBeCalled()
        done()
      }
    })
}

describe('Monkey testing bredon-validate', () => {
  jest.spyOn(global.console, 'log')
  //global.console.warn = () => false

  it('should not throw any warning', done => {
    fixtures.forEach((fixture, index) =>
      processFile(fixture, index === fixtures.length - 1, done)
    )
  })
})
