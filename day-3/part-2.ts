import { countTreesBySlope } from './shared'

function solution () {
  console.log(
    'Part 2 - trees encountered multiplied by slope:',
    countTreesBySlope({ right: 1, down: 1 }) *
    countTreesBySlope({ right: 3, down: 1 }) *
    countTreesBySlope({ right: 5, down: 1 }) *
    countTreesBySlope({ right: 7, down: 1 }) *
    countTreesBySlope({ right: 1, down: 2 })
  )
}

solution()
