import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'

import bredon from './cases/bredon'
import postcssValueParser from './cases/postcss-value-parser'

export const run = () => {
  console.log(`Running performance tests.`)

  const testSuite = new Suite()

  testSuite.add('bredon', () => bredon())
  testSuite.add('postcss-value-parser', () => postcssValueParser())

  testSuite.on('cycle', e => {
    beautifyBenchmark.add(e.target)
  })

  testSuite.on('complete', function() {
    beautifyBenchmark.log()
    console.log(`Fastest is: ${this.filter('fastest').map('name')}`)
  })

  return testSuite.run({ async: true })
}

run()
