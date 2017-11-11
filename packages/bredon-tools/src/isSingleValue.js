/* @flow */
import { types } from 'bredon'

import type { ASTNode } from '../../../flowtypes/AST'

export default function isSingleValue(ast: ASTNode) {
  return (types.isValue(ast) || types.isValueList(ast)) && ast.body.length <= 1
}
