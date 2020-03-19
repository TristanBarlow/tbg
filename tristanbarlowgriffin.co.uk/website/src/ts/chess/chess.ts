import _chess, { Chess as TChess, ChessInstance } from 'chess.js'

const Chess = (_chess as unknown as typeof TChess)
export function newBoard (fen?: string): ChessInstance {
  return new Chess(fen)
}

export * from 'chess.js'

export default Chess