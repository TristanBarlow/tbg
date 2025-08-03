import { ChessPlayer, MoveResponse } from '@tbg/chess-bots'

export const HUMAN_TYPE = 'Human'
export class Human extends ChessPlayer {
  name = HUMAN_TYPE
  isHuman = true
  getMove(): Promise<MoveResponse> {
    throw new Error('Human player should not call get move.')
  }

  get stats(): string | null {
    return null
  }
}
