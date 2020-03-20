import { ChessInstance, Chess, newBoard } from '../../chess'
import { PlayerColour } from '../chessPlayer'
import { PieceType } from 'chess.js'
import { shuffle } from '../../../util'

const MINIMAX_VALS: { [key in PieceType]: number } = {
  p: 1,
  r: 5,
  n: 3,
  b: 3,
  q: 9,
  k: 1000,
}

export interface WorkerResponse { rating: number, move: string | null }

export class MiniMacsNode {
  game: ChessInstance
  isDone = false
  moves: string[]
  bestValue = Number.NEGATIVE_INFINITY
  bestMove: string | null = null
  a: number = Number.POSITIVE_INFINITY
  b: number = Number.NEGATIVE_INFINITY
  colour: PlayerColour

  constructor (fen: string) {
    this.game = newBoard(fen)
    this.colour = this.game.turn() === 'w' ? 'white' : 'black'
    const moves = this.game.moves()
    this.moves = shuffle(moves)
  }

  NewLayer (depth: number, isMaxing: boolean, a = Number.NEGATIVE_INFINITY, b = Number.POSITIVE_INFINITY): number {
    if (depth === 0) {
      return this.EvaluateBoard()
    }

    let best_move = null
    let fen = this.game.fen()
    let moves = shuffle(this.game.moves())
    let best_value = isMaxing ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY

    for (let i = 0; i < moves.length; i++) {
      let move = moves[i]
      if (!this.game.move(move)) {
        console.log("move failed")
      }

      let value = this.NewLayer(depth - 1, !isMaxing, a, b)

      if (isMaxing) {
        if (value > best_value) {
          best_move = move
          best_value = value
        }
        a = Math.max(a, value)
      }
      else {
        if (value < best_value) {
          best_move = move
          best_value = value
        }
        b = Math.min(b, value)
      }

      this.game.load(fen)
      if (b <= a) {
        break
      }
    }

    this.bestMove = best_move || moves[0]
    return best_value
  }

  EvaluateBoard () {
    const board = this.game.board()

    let b = 0
    let w = 0
    board.forEach(row => {
      row.forEach(column => {
        if (!column) return

        let val = MINIMAX_VALS[column.type]
        if (column.color === 'w') w += val
        else b += val
      })
    })

    return this.colour === 'white' ? w - b : b - w
  }

}