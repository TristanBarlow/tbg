import { Chess } from 'chess.js'

export function newBoard(fen?: string): Chess {
  return new Chess(fen)
}
