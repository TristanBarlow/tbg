import { ChessPlayer } from './chessPlayer'
import { PlayersTypes } from './types'

export class MinMaxBot extends ChessPlayer {
  name = PlayersTypes.MINMAX
  isHuman = false
  statHistory: string = ''


  getMove (fen: string): Promise<string> {
    throw new Error('Method not implemented.')
  }

  get stats (): string {
    return this.statHistory
  }

}