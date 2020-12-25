import {
  input,
  parseLine
} from '../part-1'

function solution () {
  let validPasswords = 0

  for (const line of input) {
    const { least, most, letter, text } = parseLine(line)
    const leastLetter = text[least - 1]
    const mostLetter = text[most - 1]

    if (
      leastLetter && mostLetter && 
      leastLetter !== mostLetter &&
      (mostLetter === letter || leastLetter === letter)
    ) {
      validPasswords++
    }
  }

  console.log('Part 2 - total valid passwords:', validPasswords)
}

solution()
