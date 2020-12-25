import { readFileSync } from 'fs'
import { join } from 'path'

export type InstructionName =
  | 'nop'
  | 'acc'
  | 'jmp'

export type InstructionArg =
  | `+${number}`
  | `-${number}`

export type Instruction = `${InstructionName} ${InstructionArg}`

export const instructions: Instruction[] = readFileSync(join(__dirname, './input.txt'), 'utf-8')
  .split(/\r?\n/)
  .slice(0, -1) as any

export function executeInstructions (fixInstructions = false) {
  let cursor = 0
  let accumulator = 0

  const visitedCursor: number[] = []

  let wrongInstructionCursor = -1
  let possibleFixesTried = 0

  const possibleFixes: number[] = []

  while (true) {
    if (cursor === instructions.length) {
      break
    }

    if (visitedCursor.includes(cursor)) {
      if (!fixInstructions) {
        break
      }

      if (wrongInstructionCursor !== -1) {
        // Revert previous change
        instructions[wrongInstructionCursor] = applyInstructionTransition(instructions[wrongInstructionCursor])
      }

      wrongInstructionCursor = possibleFixes[possibleFixesTried++]
      const wrongInstruction = instructions[wrongInstructionCursor]

      instructions[wrongInstructionCursor] = applyInstructionTransition(wrongInstruction)

      // Reset variables
      cursor = 0
      visitedCursor.length = 0
      accumulator = 0
      continue
    }

    // Add visited cursor
    visitedCursor.push(cursor)
 
    const [instructionName, instructionArg] = instructions[cursor].split(' ') as [InstructionName, InstructionArg]

    switch (instructionName) {
      case 'nop':
        if (!possibleFixes.includes(cursor)) {
          possibleFixes.push(cursor)
        }
        ++cursor
        break
      case 'acc':
        accumulator += Number(instructionArg)
        ++cursor
        break
      case 'jmp':
        if (!possibleFixes.includes(cursor)) {
          possibleFixes.push(cursor)
        }
        cursor += Number(instructionArg)
        break
      default:
        throw new Error(`Unknown instruction: ${instructionName}`)
    }
  }

  return accumulator
}

function applyInstructionTransition (instruction: Instruction): Instruction {
  const isJump = instruction.startsWith('jmp')

  return instruction.replace(
    isJump ? 'jmp' : 'nop',
    isJump ? 'nop' : 'jmp'
  ) as any
}
