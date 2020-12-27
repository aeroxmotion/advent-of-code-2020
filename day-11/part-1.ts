import {
  getLastGridState,
  getOccupiedSeats,
  iterateGrid,
  getAdjacentOccupiedSeats,
  Position
} from './shared'

function solution () {
  console.log(
    'Part 1 - Result count:',
    getOccupiedSeats(
      getLastGridState(
        (currentGridState, nextGridState, stateChanged) => {
          iterateGrid(currentGridState, (position, y, x) => {
            switch (position) {
              case Position.EMPTY_SEAT:
                if (!getAdjacentOccupiedSeats(currentGridState, y, x)) {
                  nextGridState[y][x] = Position.OCCUPIED_SEAT
                  stateChanged()
                }
                break

              case Position.OCCUPIED_SEAT:
                if (getAdjacentOccupiedSeats(currentGridState, y, x) >= 4) {
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
