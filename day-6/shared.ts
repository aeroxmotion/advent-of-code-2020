import { readFileSync } from 'fs'
import { join } from 'path'

export const groups: string[] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n\r?\n/)

export function iterateGroup (iterator: (groupAnswers: string[]) => void) {
  for (const group of groups) {
    iterator(group.split(/\r?\n/))
  }
}
