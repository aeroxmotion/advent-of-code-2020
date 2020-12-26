import { readFileSync } from 'fs'
import { join } from 'path'

export const numbers: number[] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n/)
  .slice(0, -1)
  .map(Number)

export function getDiffNumber (preamble: number, getRange = false) {
  const preambleSumCache: number[] = []
  const { length } = numbers

  for (let i = 0; i < preamble - 1; i++) {
    const I = numbers[i]

    for (let j = 1; j < preamble; j++) {
      const J = numbers[j]

      preambleSumCache.push(I + J)
    }
  }

  for (let i = preamble; i < length; i++) {
    const n = numbers[i]

    if (!preambleSumCache.includes(n)) {
      if (getRange) {
        const sums: Array<[number, { max: number, min: number }]> = []

        for (let j = i - 1; j >= 0; j--) {
          const J = numbers[j]

          let index = 0

          for (const [sum, { max, min }] of sums) {
            const nextSum = sum + J
            const range = { max: Math.max(max, J), min: Math.min(min, J) }

            if (nextSum === n) {
              return range.max + range.min
            }

            sums[index++] = [
              nextSum,
              range
            ]
          }

          sums.push([J, { max: -Infinity, min: Infinity }])
        }

        return NaN
      }

      return n
    }

    let j = i
    let min = j - preamble + 1

    while (j-- > min) {
      preambleSumCache.push(numbers[j] + n)
    }

    let maxPreamble = preamble - 1

    while (maxPreamble--) {
      preambleSumCache.shift()
    }
  }
}
