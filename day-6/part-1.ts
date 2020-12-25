import { iterateGroup } from './shared'

function solution () {
  let groupCounts = 0

  iterateGroup(groupAnswers => {
    const set = new Set<string>()

    for (const personAnswers of groupAnswers) {
      for (const answer of personAnswers) {
        set.add(answer)
      }
    }

    groupCounts += set.size
  })

  console.log('Part 1 - Total answers count:', groupCounts)
}

solution()
