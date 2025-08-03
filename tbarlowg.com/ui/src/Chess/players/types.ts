import { ChessPlayer, MinMaxBot, RoundRobin } from '@tbg/chess-bots'
import MinMaxWorker from '@tbg/chess-bots/src/MinMax/node.worker?worker&url'
import RoundRobinWorker from '@tbg/chess-bots/src/RoundRobin/node.worker?worker&url'
import { Human, HUMAN_TYPE } from './human'
import { RandomBot } from './random'

export const RANDOM_TYPE = 'Random'
export const PLAYERS = {
  [HUMAN_TYPE]: () => new Human(),
  MinMax: () => new MinMaxBot(MinMaxWorker),
  [RANDOM_TYPE]: () => new RandomBot(),
  RoundRobin: () => new RoundRobin(RoundRobinWorker),
} satisfies Record<string, () => ChessPlayer>

export type PlayerOptions = keyof typeof PLAYERS

export const PLAYER_OPTIONS = Object.keys(PLAYERS) as [PlayerOptions, ...PlayerOptions[]]

export function PlayerFactory(player: PlayerOptions): ChessPlayer {
  return PLAYERS[player]()
}
