import { ChessPlayer } from './chessPlayer'
import { Human } from './human'
import { MinMaxBot } from './MinMax'
import { RandomBot } from './random'
import { RoundRobin } from './RoundRobin'

export enum PlayersTypes {
  HUMAN = 'Human',
  MINMAX = 'MinMax',
  RANDOM = 'Random',
  RoundRobin = 'RoundRobin',
}

export const Players: { [key in PlayersTypes]: () => ChessPlayer } = {
  Human: () => new Human(),
  MinMax: () => new MinMaxBot(),
  Random: () => new RandomBot(),
  RoundRobin: () => new RoundRobin(),
}

export function PlayerFactory(player: PlayersTypes): ChessPlayer {
  return Players[player]()
}

export interface MoveResponse {
  move: string | null
  rating: number
  timeTaken: number
  details: string
}

export function timeTaken(strt: number): number {
  return (performance.now() - strt) / 1000
}

export interface MoveRequest {
  fen: string
  maxTime: number
}
