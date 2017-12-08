import parse from 'postcss-value-parser'
import createUniqueValue from '../utils/createUniqueValue'

export default () => parse(createUniqueValue())
