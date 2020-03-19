import { ChessPlayer } from './chessPlayer'

export class Human extends ChessPlayer {
  name = "Human"
  isHuman = true
  getMove (fen: string): Promise<string> {
    throw new Error('Human player should not call get move.')
  }
}