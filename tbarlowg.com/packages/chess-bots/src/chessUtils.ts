import { Chess, Color } from 'chess.js'
import { MoveRequest, MoveResponse } from './chessTypes'

export function newBoard(fen?: string): Chess {
  return new Chess(fen, { skipValidation: true })
}

export function invertColour(colour: Color) {
  return 'w' === colour ? 'b' : 'w'
}

export function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function makeWebWorker(getMove: (erq: MoveRequest) => MoveResponse) {
  onmessage = async (e) => {
    const data: MoveRequest = e.data
    const move = getMove(data)
    postMessage(move)
  }
}
