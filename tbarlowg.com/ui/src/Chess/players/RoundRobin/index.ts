import { WebWorkerChessPlayer } from '../chessPlayerMultiThreaded'
import { PlayersTypes } from '../types'
import Worker from './node.worker?worker&url'

export class RoundRobin extends WebWorkerChessPlayer {
  name = PlayersTypes.RoundRobin
  isHuman = false
  statHistory: string = ''
  inlineWorkerStr = Worker

  get stats(): string {
    return this.statHistory
  }
}
