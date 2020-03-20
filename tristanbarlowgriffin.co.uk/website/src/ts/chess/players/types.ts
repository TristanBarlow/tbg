import { ChessPlayer } from './chessPlayer'
import { Human } from './human'
import { MinMaxBot } from './MinMax'
import { RandomBot } from './random'

export enum PlayersTypes {
  HUMAN = "Human",
  MINMAX = "MinMax",
  RANDOM = "Random"
}

export const Players: { [key in PlayersTypes]: ChessPlayer } = {
  Human: new Human(),
  MinMax: new MinMaxBot(),
  Random: new RandomBot()
}

export function PlayerFactory (player: PlayersTypes): ChessPlayer {
  console.log('Player', player)
  return Players[player]
}
