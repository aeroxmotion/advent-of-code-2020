import { readFileSync } from 'fs'
import { join } from 'path'

export const seats: string[] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n/)
  .slice(0, -1)

enum RowHalf {
  LOWER_HALF = 'F',
  UPPER_HALF = 'B'
}

enum ColumnHalf {
  LOWER_HALF = 'L',
  UPPER_HALF = 'R'
}

interface Seat {
  id: number
  row: number
  column: number
}

export function iterateSeats (iterator: (seat: Seat) => void) {
  for (const seat of seats) {
    const { length } = seat

    let minRow = 0
    let maxRow =  127

    let minColumn = 0
    let maxColumn = 7

    for (let r = 0; r < length - 3; r++) {
      const rowHalf: RowHalf = seat[r] as any
      const rowDiff = (maxRow - minRow) / 2

      if (rowHalf === RowHalf.UPPER_HALF) {
        minRow += Math.floor(rowDiff)
      } else {
        maxRow -= Math.ceil(rowDiff)
      }
    }

    for (let c = length - 3; c < length; c++) {
      const columnHalf: ColumnHalf = seat[c] as any
      const columnDiff = (maxColumn - minColumn) / 2

      if (columnHalf === ColumnHalf.UPPER_HALF) {
        minColumn += Math.floor(columnDiff)
      } else {
        maxColumn -= Math.ceil(columnDiff)
      }
    }

    iterator({
      id: maxRow * 8 + maxColumn,
      row: maxRow,
      column: maxColumn
    })
  }
}
