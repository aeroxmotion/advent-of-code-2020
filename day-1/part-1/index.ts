import { readFileSync } from 'fs'
import { join } from 'path'

const rawNumbers: number[] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n/)
  .map(Number)

export const input: number[] = rawNumbers.slice(0, rawNumbers.length - 1)

export const { length } = input
export const lastIndex = length - 1

export const YEAR_TARGET = 2020

/**
 * Relevant text:
 * 
 * Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.
 */

function solution () {
  for (let i = 0; i < lastIndex; i++) {
    const I = input[i]
  
    for (let j = 1; j < length; j++) {
      const J = input[j]
  
      if (I + J === YEAR_TARGET) {
        return console.log('Part 1 - answer:', I * J)
      }
    }
  }

  console.log('Part 1 - No answer found...')
}

solution()
