import { Color } from 'chess.js'
import { PlayersTypes, MoveResponse, MoveRequest } from './types'

export type PlayerColour = Color
export abstract class ChessPlayer {
  abstract name: PlayersTypes
  abstract isHuman: boolean
  abstract getMove(request: MoveRequest): Promise<MoveResponse | null>
  abstract get stats(): string | null
}
