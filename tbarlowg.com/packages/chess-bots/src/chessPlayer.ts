import { Color } from 'chess.js'
import { MoveRequest, MoveResponse } from './chessTypes'

export type PlayerColour = Color
export abstract class ChessPlayer {
  abstract name: string
  abstract isHuman: boolean
  abstract getMove(request: MoveRequest): Promise<MoveResponse | null>
  abstract get stats(): string | null
}
