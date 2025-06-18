import { Chess, Color } from 'chess.js'

export function newBoard(fen?: string): Chess {
  return new Chess(fen, { skipValidation: true })
}

export function invertColour(colour: Color) {
  return 'w' === colour ? 'b' : 'w'
}
