import {
  getLastGridState,
  getOccupiedSeats,
  iterateGrid,
  getDeeplyOccupiedSeats,
  prettyPrintGrid,
  Position
} from './shared'

function solution () {
  console.log(
    'Part 2 - Result count:',
    getOccupiedSeats(
      getLastGridState(
        (currentGridState, nextGridState, stateChanged) => {
          iterateGrid(currentGridState, (position, y, x) => {
            switch (position) {
              case Position.EMPTY_SEAT:
                if (!getDeeplyOccupiedSeats(currentGridState, y, x)) {
                  nextGridState[y][x] = Position.OCCUPIED_SEAT
                  stateChanged()
                }
                break
  
              case Position.OCCUPIED_SEAT:
                if (getDeeplyOccupiedSeats(currentGridState, y, x) >= 5) {
                  nextGridState[y][x] = Position.EMPTY_SEAT
                  stateChanged()
                }
                break
  
              default:
                // Position.FLOOR
                // No-op
                break
            }
          })
        }
      )
    )
  )
}

solution()
