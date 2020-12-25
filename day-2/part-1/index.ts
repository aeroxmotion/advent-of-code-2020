import { readFileSync } from 'fs'
import { join } from 'path'

export const input: string[] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n/)
  .slice(0, -1)

const LINE_REGEX = /^(?<least>\d+)-(?<most>\d+) (?<letter>[a-z]): (?<text>[a-z]+)$/

function solution () {
  let validPasswords = 0
  
  for (const line of input) {
    const { least, most, letter, text } = parseLine(line)
    const letterCount = text.replace(
      new RegExp(`[^${letter}]`, 'g'),
      ''
    ).length

    if (letterCount >= least && letterCount <= most) {
      validPasswords++
    }
  }

  console.log('Part 1 - total valid passwords:', validPasswords)
}

export function parseLine (line: string) {
  const { groups: { least, most, letter, text } } = line.match(LINE_REGEX)

  return {
    least: Number(least),
    most: Number(most),
    letter,
    text
  }
}

solution()
