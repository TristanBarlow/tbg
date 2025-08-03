import { PlayersTypes, MoveResponse } from './types'

export class Human extends ChessPlayer {
  name = PlayersTypes.HUMAN
  isHuman = true
  getMove(): Promise<MoveResponse> {
    throw new Error('Human player should not call get move.')
  }

  get stats(): string | null {
    return null
  }
}
