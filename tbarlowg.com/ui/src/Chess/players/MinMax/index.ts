import { ChessPlayer } from '../chessPlayer'
import { PlayersTypes, MoveResponse } from '../types'
import * as MinMaxWorker from './node.worker'

type MoveWorker = typeof MinMaxWorker
export class MinMaxBot extends ChessPlayer {
  name = PlayersTypes.MINMAX
  isHuman = false
  statHistory: string = ''
  static _woker: MoveWorker
  get worker(): MoveWorker {
    if (!MinMaxBot._woker) {
      MinMaxBot._woker = MinMaxWorker
    }

    return MinMaxBot._woker
  }

  getMove(fen: string): Promise<MoveResponse | null> {
    const result = this.worker.getMove(fen)
    return Promise.resolve(result)
  }

  get stats(): string {
    return this.statHistory
  }
}
