import { PlayersTypes } from './types'

export type PlayerColour = "black" | "white"
export abstract class ChessPlayer {
  abstract name: PlayersTypes
  abstract isHuman: boolean
  abstract getMove (fen: string): Promise<string | null>
  abstract get stats (): string | null
}