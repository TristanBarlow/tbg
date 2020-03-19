import { ChessPlayer } from './chessPlayer'
import { newBoard } from '../chess'
import { PlayersTypes } from './types'


export class RandomBot extends ChessPlayer {
  name = PlayersTypes.RANDOM
  isHuman = false

  async getMove (fen: string): Promise<string | null> {
    const game = newBoard(fen)
    const possibleMoves = game.moves()
    if (possibleMoves.length <= 0) return null

    let randomIndex = Math.floor(Math.random() * possibleMoves.length)
    return possibleMoves[randomIndex]
  }
}