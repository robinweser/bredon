/* @flow */
import { isValue, isValueList } from 'bredon-types'

import type { ASTNode } from '../../../flowtypes/AST'

export default function isSingleValue(ast: ASTNode) {
  return (
    (isValue(ast) && !ast.mutli) || (isValueList(ast) && ast.body.length <= 1)
  )
}
