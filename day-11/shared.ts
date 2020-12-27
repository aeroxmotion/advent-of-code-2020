import { readFileSync } from 'fs'
import { join } from 'path'

export const grid: string[][] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n/)
  .slice(0, -1)
  .map(line => line.split(''))

export enum Position {
  FLOOR = '.',
  EMPTY_SEAT = 'L',
  OCCUPIED_SEAT = '#'
}

export type Grid = Position[][]

export interface Coord {
  y: number
  x: number
}

const adjacentCoords: Coord[] = [
  { y: -1, x: -1 }, { y: -1, x: 0 }, { y: -1, x: 1 },
  { y:  0, x: -1 },                  { y:  0, x: 1 },
  { y:  1, x: -1 }, { y:  1, x: 0 }, { y:  1, x: 1 }
]

function getGridCopy (grid: Grid): Grid {
  return grid.map(row => row.slice())
}

export function getLastGridState (criteria: (
    currentGridState: Grid,
    nextGridState: Grid,
    stateChanged: () => void
  ) => void
) {
  let stateChanged = true
  let currentGridState: Grid = grid as any

  while (stateChanged) {
    // Reset state changed
    stateChanged = false

    const nextGridState = getGridCopy(currentGridState)

    criteria(
      currentGridState,
      nextGridState,
      () => {
        stateChanged = true
      }
    )

    // Update grid state
    if (stateChanged) {
      currentGridState = nextGridState
    }
  }

  return currentGridState
}

export function getOccupiedSeats (grid: Grid) {
  let occupiedSeats = 0

  iterateGrid(grid, position => {
    if (position === Position.OCCUPIED_SEAT) {
      ++occupiedSeats
    }
  })

  return occupiedSeats
}

export function getAdjacentOccupiedSeats (grid: Grid, y: number, x: number): number {
  let occupiedSeats = 0

  for (const { y: yAdjacent, x: xAdjacent } of adjacentCoords) {
    if (grid[y + yAdjacent]?.[x + xAdjacent] === Position.OCCUPIED_SEAT) {
      occupiedSeats++
    }
  }

  return occupiedSeats
}

export function getDeeplyOccupiedSeats (grid: Grid, y: number, x: number): number {
  let occupiedSeats = 0

  for (const { y: yAdjacent, x: xAdjacent } of adjacentCoords) {
    let position: Position
    let yCopy = y
    let xCopy = x

    while (
      (position = grid[yCopy += yAdjacent]?.[xCopy += xAdjacent]) &&
      position !== Position.EMPTY_SEAT
    ) {
      if (position === Position.OCCUPIED_SEAT) {
        occupiedSeats++
        break
      }
    }
  }

  return occupiedSeats
}

export function iterateGrid (grid: Grid, iterator: (position: Position, y: number, x: number) => void) {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]

    for (let x = 0; x < row.length; x++) {
      iterator(row[x], y, x)
    }
  }
}

export function prettyPrintGrid (grid: Grid) {
  return `\n${grid.map(row => row.join('')).join('\n')}`
}
