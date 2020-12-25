import { readFileSync } from 'fs'
import { join } from 'path'

export const passports: string[] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n\r?\n/)
  .slice(0, -1)

export interface Passport {
  byr: string
  iyr: string
  eyr: string
  hgt: string
  hcl: string
  ecl: string
  pid: string
  cid?: string
}

export function iteratePassports (iterator: (passport: Partial<Passport>) => void) {
  for (const passportStr of passports) {
    iterator(
      passportStr
        .split(/[\n\s]+/)
        .reduce((acc, pair) => {
          const [key, value] = pair.split(':')
          acc[key] = value

          return acc
        }, {})
    )
  }
}
