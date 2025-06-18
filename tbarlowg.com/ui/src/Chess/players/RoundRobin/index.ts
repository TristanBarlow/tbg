import { WebWorkerChessPlayer } from '../chessPlayerMultiThreaded'
import { PlayersTypes } from '../types'
import MinMaxWorker from './node.worker?worker&url'

export class RoundRobin extends WebWorkerChessPlayer {
  name = PlayersTypes.RoundRobin
  isHuman = false
  statHistory: string = ''
  inlineWorkerStr = MinMaxWorker

  get stats(): string {
    return this.statHistory
  }
}
