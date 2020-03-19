import { ChessPlayer } from './chessPlayer'
import { Human } from './human'
import { RandomBot } from './random'

export * from './chessPlayer'
export * from './human'
export * from './random'

export enum PlayersTypes {
  HUMAN = "Human",
  RANDOM = "Random"
}

export const Players: { [key in PlayersTypes]: ChessPlayer } = {
  Human: new Human(),
  Random: new RandomBot()
}

export function PlayerFactory (player: PlayersTypes): ChessPlayer {
  return Players[player]
}
