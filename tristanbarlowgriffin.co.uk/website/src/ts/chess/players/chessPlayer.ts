import { PlayersTypes } from './types'

export abstract class ChessPlayer {
  abstract name: PlayersTypes
  abstract isHuman: boolean
  abstract getMove (fen: string): Promise<string | null>
}