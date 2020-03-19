import { ChessPlayer } from './chessPlayer'
import { newBoard } from '../chess'

export class RandomBot extends ChessPlayer {
  isHuman = false
  async getMove (fen: string): Promise<string | null> {
    const game = newBoard(fen)
    const possibleMoves = game.moves()
    if (possibleMoves.length <= 0) return null

    let randomIndex = Math.floor(Math.random() * possibleMoves.length)
    return possibleMoves[randomIndex]
  }
}
