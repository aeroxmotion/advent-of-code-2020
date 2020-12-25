import {
  iteratePassports,
  Passport
} from './shared'

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

    for (const validPassportKey of validPassportKeys) {
      if (!passport[validPassportKey]) {
        invalid = true
        break
      }
    }

    if (!invalid) {
      validPassports++
    }
  })

  console.log('Part 1 - Total valid passports:', validPassports)
}

solution()
