import { ChessPlayer } from './chessPlayer'
import { Human } from './human'
import { RandomBot } from './random'

export enum PlayersTypes {
  HUMAN = "Human",
  RANDOM = "Random"
}

export const Players: { [key in PlayersTypes]: ChessPlayer } = {
  Human: new Human(),
  Random: new RandomBot()
}

export function PlayerFactory (player: PlayersTypes): ChessPlayer {
  console.log('Player', player)
  return Players[player]
}
