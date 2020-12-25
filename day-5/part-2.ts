import { iterateSeats } from './shared'

function solution () {
  let minSeatID = Infinity
  let maxSeatID = -Infinity

  const seatIDs = new Set<number>()

  iterateSeats(seat => {
    minSeatID = Math.min(seat.id, minSeatID)
    maxSeatID = Math.max(seat.id, maxSeatID)

    seatIDs.add(seat.id)
  })

  for (let seatID = minSeatID; seatID < maxSeatID; seatID++) {
    if (!seatIDs.has(seatID)) {
      return console.log('Part 2 - Seat ID found:', seatID)
    }
  }

  console.log('Part 2 - No answer found...')
}

solution()
