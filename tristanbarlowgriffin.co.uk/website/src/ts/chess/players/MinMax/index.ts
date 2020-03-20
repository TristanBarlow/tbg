import { ChessPlayer } from '../chessPlayer'
import { PlayersTypes } from '../types'
import { MiniMacsNode, WorkerResponse } from './node'

export class MinMaxBot extends ChessPlayer {
  name = PlayersTypes.MINMAX
  isHuman = false
  statHistory: string = ''


  async getMove (fen: string): Promise<string | null> {
    const worker = new Worker('./node.worker.ts')
    const result = await new Promise<WorkerResponse>((resolve) => {
      worker.onmessage = (ev) => {
        resolve(ev.data)
      }
    })
    return result.move
  }

  get stats (): string {
    return this.statHistory
  }

}