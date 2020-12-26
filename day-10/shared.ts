import { readFileSync } from 'fs'
import { join } from 'path'

export const adapters: number[] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n/)
  .slice(0, -1)
  .map(Number)

const sortedAdapters = adapters.slice().sort((a, b) => a - b)
const { length } = adapters

type JoltDiffs = Record<1 | 2 | 3, number>

export function getJoltDiffs (): JoltDiffs {
  const result: JoltDiffs = {
    1: 0,
    2: 0,
    3: 1
  }

  for (let i = -1; i < length - 1; i++) {
    const diff: keyof JoltDiffs = (sortedAdapters[i + 1] - (sortedAdapters[i] || 0) as any)

    result[diff]++
  }

  return result
}

export function getAdaptersArrangements () {
  let totalArrangements = 0

  // TODO

  return totalArrangements
}
