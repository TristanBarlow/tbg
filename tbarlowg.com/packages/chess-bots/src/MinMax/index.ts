import { WebWorkerChessPlayer } from '../chessPlayerMultiThreaded'

export class MinMaxBot extends WebWorkerChessPlayer {
  name = 'MinMax'
  isHuman = false
  statHistory: string = ''

  get stats(): string {
    return this.statHistory
  }
}

export { getMoveMinMax } from './node'
