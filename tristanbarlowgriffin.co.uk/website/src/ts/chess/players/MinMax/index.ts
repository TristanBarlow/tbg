import { ChessPlayer } from '../chessPlayer'
import { PlayersTypes } from '../types'
import * as MinMaxWorker from './node.worker'

type MoveWorker = typeof MinMaxWorker
export class MinMaxBot extends ChessPlayer {
  name = PlayersTypes.MINMAX
  isHuman = false
  statHistory: string = ''
  static _woker: MoveWorker
  get worker (): MoveWorker {
    if (!MinMaxBot._woker) {
      MinMaxBot._woker = new (MinMaxWorker as any)()
    }

    return MinMaxBot._woker
  }


  async getMove (fen: string): Promise<string | null> {
    const result = await this.worker.getMove(fen)
    return result.move
  }

  get stats (): string {
    return this.statHistory
  }

}