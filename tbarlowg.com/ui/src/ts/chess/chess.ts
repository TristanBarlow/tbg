import { Chess, ChessInstance } from './chessLib'

export function newBoard(fen?: string): ChessInstance {
  return Chess(fen)
}

export * from './chessLib'
export default Chess
