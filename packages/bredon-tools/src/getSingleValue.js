/* @flow */
import { isSingleValue } from './isSingleValue'

import type { ASTNode } from '../../../flowtypes/AST'

export default function getSingleValue(ast: ASTNode): ?ASTNode {
  return isSingleValue(ast) && ast.body[0]
}
