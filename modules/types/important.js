/* @flow */
import type { SimpleNode } from '../../flowtypes/AST'

export default function important(): SimpleNode {
  return {
    type: 'Important',
    value: '!important'
  }
}
