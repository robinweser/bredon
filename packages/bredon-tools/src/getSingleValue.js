/* @flow */
import { types } from 'bredon'

import isSingleValue from './isSingleValue'

import type { ASTNode } from '../../../flowtypes/AST'

export default function getSingleValue(ast: ASTNode): ?ASTNode {
  return isSingleValue(ast) && types.isValueList(ast)
    ? ast.body[0].body[0]
    : ast.body[0]
}
