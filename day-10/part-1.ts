import { getJoltDiffs } from './shared'

function solution () {
  const diffs = getJoltDiffs()

  console.log(
    'Part 1 - Result:',
    diffs[1] * diffs[3]
  )
}

solution()
