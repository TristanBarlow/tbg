import { ChessPlayer } from './chessPlayer'
import { MoveResponse } from './types'

export abstract class WebWorkerChessPlayer extends ChessPlayer {
  abstract inlineWorkerStr: string
  private _worker: Worker | undefined
  get worker() {
    if (!this._worker) {
      this._worker = new Worker(this.inlineWorkerStr, { type: 'module' })
    }

    return this._worker
  }

  getMove(fen: string): Promise<MoveResponse | null> {
    const worker = this.worker
    return new Promise((resolve) => {
      worker.onmessage = (msg) => {
        resolve(msg.data as MoveResponse)
      }
      worker.postMessage(fen)
    })
  }
}
