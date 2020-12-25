import { readFileSync } from 'fs'
import { join } from 'path'

export const toboggan: string[] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n/)
  .slice(0, -1)

const { length: tobogganHeight } = toboggan
const tobogganWidth = toboggan[0].length

interface Slope {
  right: number
  down: number
}

enum Location {
  OPEN_SQUARE = '.',
  TREE = '#'
}

export function countTreesBySlope (slope: Slope) {
  let treesEncountered = 0
  let x = 0

  for (let y = slope.down; y < tobogganHeight; y += slope.down) {
    const location = toboggan[y][(x += slope.right) % tobogganWidth]

    if (location === Location.TREE) {
      ++treesEncountered
    }
  }

  return treesEncountered
}