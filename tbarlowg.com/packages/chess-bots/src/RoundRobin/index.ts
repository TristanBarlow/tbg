import { WebWorkerChessPlayer } from '../chessPlayerMultiThreaded'

export class RoundRobin extends WebWorkerChessPlayer {
  name = 'Round Robin'
  isHuman = false
  statHistory: string = ''

  get stats(): string {
    return this.statHistory
  }
}

export { getMoveRoundRobin } from './node'
