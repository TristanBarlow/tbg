import { ChessPlayer } from './chessPlayer'
import { PlayersTypes } from './types'

export class Human extends ChessPlayer {
  name = PlayersTypes.HUMAN
  isHuman = true
  getMove (fen: string): Promise<string> {
    throw new Error('Human player should not call get move.')
  }
}