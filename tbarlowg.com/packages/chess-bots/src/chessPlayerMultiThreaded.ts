import { ChessPlayer } from './chessPlayer'
import { MoveRequest, MoveResponse } from './chessTypes'

export abstract class WebWorkerChessPlayer extends ChessPlayer {
  constructor(private inlineWorkerStr: string) {
    super()
  }

  private _worker: Worker | undefined
  get worker() {
    if (!this._worker) {
      this._worker = new Worker(this.inlineWorkerStr, { type: 'module' })
    }

    return this._worker
  }

  getMove(request: MoveRequest): Promise<MoveResponse | null> {
    const worker = this.worker
    return new Promise((resolve) => {
      worker.onmessage = (msg) => {
        resolve(msg.data as MoveResponse)
      }
      worker.postMessage(request)
    })
  }
}
