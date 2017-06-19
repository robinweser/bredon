/* @flow */
import { isCSSValue } from 'bredon-types'

import type { ASTNode } from '../../../flowtypes/AST'

export default function isSingleValue(ast: ASTNode) {
  return isCSSValue(ast) && ast.body.length === 1
}
