/* @flow */
export default function loopUntilConditionIsFulfilled(
  end: number,
  condition: Function
) {
  let currentIndex: number = 0

  while (end > currentIndex) {
    if (condition(currentIndex)) {
      return currentIndex
    }

    ++currentIndex
  }

  return end
}
