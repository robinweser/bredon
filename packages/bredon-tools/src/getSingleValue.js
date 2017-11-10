/* @flow */
import { isValueList } from 'bredon-types'

import isSingleValue from './isSingleValue'

import type { ASTNode } from '../../../flowtypes/AST'

export default function getSingleValue(ast: ASTNode): ?ASTNode {
  return isSingleValue(ast) && isValueList(ast)
    ? ast.body[0].body[0]
    : ast.body[0]
}
