import { Color } from 'chess.js'
import { PlayersTypes, MoveResponse } from './types'

export type PlayerColour = Color
export abstract class ChessPlayer {
  abstract name: PlayersTypes
  abstract isHuman: boolean
  abstract getMove(fen: string): Promise<MoveResponse | null>
  abstract get stats(): string | null
}
