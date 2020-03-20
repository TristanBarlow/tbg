import { ChessPlayer } from '../chessPlayer'
import { PlayersTypes } from '../types'
import { WorkerResponse } from './node'
import * as NodeWorker from './node.worker'

export class MinMaxBot extends ChessPlayer {
  name = PlayersTypes.MINMAX
  isHuman = false
  statHistory: string = ''


  async getMove (fen: string): Promise<string | null> {
    const worker = new (NodeWorker as any)() as typeof NodeWorker
    const result = await worker.getMove(fen)
    return result.move
  }

  get stats (): string {
    return this.statHistory
  }

}