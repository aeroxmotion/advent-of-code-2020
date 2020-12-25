import { iterateSeats } from './shared'

function solution () {
  let maxSeatID = 0

  iterateSeats(seat => {
    maxSeatID = Math.max(maxSeatID, seat.id)
  })

  console.log('Part 1 - Max seat ID:', maxSeatID)
}

solution()
