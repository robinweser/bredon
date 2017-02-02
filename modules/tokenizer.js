import type Token from '../flowtypes/Token'
import type RuleMap from '../flowtypes/Rule'

import loopUntilConditionIsFulfilled from './utils/loopUntilConditionIsFulfilled'
import getFirstMatchingRule from './utils/getFirstMatchingRule'

function isEmpty(str: string): boolean {
  return str.length === 0
}

export default function createTokenizer(ruleTokenMap: RuleMap): Function {
  return function tokenize(input: string, tokens: Array<Token> = []): Array<Token> {
    // stop at empty strings
    if (isEmpty(input) || input === 'undefined') {
      return tokens
    }

    function isNotMatchingAnyRule(currentIndex: number): boolean {
      return !getFirstMatchingRule(input.substring(0, currentIndex + 1), ruleTokenMap)
    }

    const ruleEndIndex: number = loopUntilConditionIsFulfilled(input.length, isNotMatchingAnyRule)

    // if no rule matched the first char
    // we have encountered invalid syntax
    // and thus can throw a syntax error
    if (ruleEndIndex === 0) {
      throw new SyntaxError(
        `Invalid Token: "${input.substr(0, Math.min(15, input.length))}..."
        "${input[0]}" does not match any rules.`
      )
    }

    const matchedValue: string = input.substring(0, ruleEndIndex)
    const matchedTokenType: string = getFirstMatchingRule(matchedValue, ruleTokenMap)

    const token: Token = {
      type: matchedTokenType,
      value: matchedValue
    }

    tokens.push(token)

    return tokenize(input.substring(ruleEndIndex), tokens)
  }
}
