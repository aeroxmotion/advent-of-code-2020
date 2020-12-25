import {
  input,
  length,
  lastIndex,
  YEAR_TARGET
} from '../part-1'

const secondLastIndex = lastIndex - 1

/**
 * Relevant text:
 * 
 * They offer you a second one if you can find three numbers in your expense report that meet the same criteria
 */

/**
 * @solution
 */
function solution () {
  for (let i = 0; i < secondLastIndex; i++) {
    const I = input[i]
  
    for (let j = 1; j < lastIndex; j++) {
      const J = input[j]
  
      for (let k = 2; k < length; k++) {
        const K = input[k]
  
        if (I + J + K === YEAR_TARGET) {
          return console.log('Part 2 - answer:', I * J * K)
        }
      }
    }
  }

  console.log('Part 2 - No answer found...')
}

solution()
