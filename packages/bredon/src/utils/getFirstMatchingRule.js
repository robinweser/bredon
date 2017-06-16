/* @flow */
import type { RuleMap } from '../../../../flowtypes/RuleMap'

export default function getFirstMatchingRule(
  str: string,
  ruleTokenMap: RuleMap
): string | false {
  for (const token in ruleTokenMap) {
    if (ruleTokenMap[token].test(str)) {
      return token
    }
  }

  // return false if not rule matches
  return false
}
