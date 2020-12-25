import {
  iteratePassports,
  Passport,
  passports
} from './shared'

function validateNumber (value: string, least: number, most: number) {
  const n = Number(value)

  return (
    value.length === String(least).length &&
    !Number.isNaN(n) &&
    n >= least && n <= most
  )
}

const HEIGHT_REGEX = /(?<n>\d+)(?<unit>cm|in)/
const COLOR_REGEX = /^#[0-9a-f]{6}$/
const PASSPORT_ID_REGEX = /^\d{9}$/

const VALID_EYE_COLORS = [
  'amb',
  'blu',
  'brn',
  'gry',
  'grn',
  'hzl',
  'oth'
]

console.log('Total passports:', passports.length)

const passportValidations: Record<keyof Passport, (value: string) => boolean> = {
  byr: value => validateNumber(value, 1920, 2002),
  iyr: value => validateNumber(value, 2010, 2020),
  eyr: value => validateNumber(value, 2020, 2030),
  hgt: value => {
    const match = value.match(HEIGHT_REGEX)

    if (!match) {
      return false
    }

    const { groups: { n, unit } } = match
    const height = Number(n)
    const heightsPerSize = {
      cm: [150, 193],
      in: [59, 76]
    }

    const [least, most] = heightsPerSize[unit]


    if (height < least || height > most) {
      return false
    }

    return true
  },
  hcl: value => COLOR_REGEX.test(value),
  ecl: value => VALID_EYE_COLORS.includes(value),
  pid: value => PASSPORT_ID_REGEX.test(value),
  cid: _ => true // Ignored
}

const validPassportKeys: Array<keyof Passport> = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
]

function solution () {
  let validPassports = 0

  iteratePassports(passport => {
    let invalid = false

    for (const key of validPassportKeys) {
      const passportValidator = passportValidations[key]

      if (!passportValidator(passport[key] ?? '')) {
        invalid = true
        break
      }
    }

    if (!invalid) {
      validPassports++
    }
  })

  console.log('Part 2 - Total valid passports:', validPassports)
}

solution()