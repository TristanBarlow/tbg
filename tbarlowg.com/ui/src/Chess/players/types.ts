import { Human } from './human'
import { RandomBot } from './random'

export const Players: Record<string, () => ChessPlayer> = {
  Human: () => new Human(),
  MinMax: () => new MinMaxBot(),
  Random: () => new RandomBot(),
  RoundRobin: () => new RoundRobin(),
}

export function PlayerFactory(player: PlayersTypes): ChessPlayer {
  return Players[player]()
}
