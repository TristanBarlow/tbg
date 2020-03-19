import { ChessPlayer } from './chessPlayer'

export * from './chessPlayer'
export * from './human'
export * from './random'

export enum PlayersTypes {
  HUMAN = "Human",
  RANDOM = "Random"
}

export const Players: { [id: string where In PlayersTypes]: ChessPlayer } = {

}

export function PlayerFactory (player: Players): ChessPlayer {

}