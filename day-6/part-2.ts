import { iterateGroup } from './shared'

function solution () {
  let groupCounts = 0

  iterateGroup(groupAnswers => {
    let firstPersonAnswers = groupAnswers[0]

    if (!groupAnswers.length) {
      groupCounts += firstPersonAnswers.length
    } else {
      for (const answer of firstPersonAnswers) {
        let nonEveryoneAnswer = false

        for (let i = 1; i < groupAnswers.length; i++) {
          if (!groupAnswers[i].includes(answer)) {
            nonEveryoneAnswer = true
            break
          }
        }

        if (!nonEveryoneAnswer) {
          groupCounts++
        }
      }
    }
  })

  console.log('Part 2 - Total answers count:', groupCounts)
}

solution()
