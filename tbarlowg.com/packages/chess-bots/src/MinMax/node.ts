import { newBoard, shuffle } from '../chessUtils'
import { PlayerColour } from '../chessPlayer'
import { Chess, PieceSymbol } from 'chess.js'
import { MoveRequest, MoveResponse, timeTaken } from '../chessTypes'

const MINIMAX_VALS: { [key in PieceSymbol]: number } = {
  p: 1,
  r: 5,
  n: 3,
  b: 3,
  q: 9,
  k: 10,
}

const CHECK_MATE_VALUE = 50

export class MiniMacsNode {
  game: Chess
  isDone = false
  moves: string[]
  bestValue = Number.NEGATIVE_INFINITY
  bestMove: string | null = null
  myMovesChecked = 0
  opMovesChecked = 0
  colour: PlayerColour

  constructor(fen: string) {
    this.game = newBoard(fen)
    this.colour = this.game.turn()
    const moves = this.game.moves()
    this.moves = shuffle(moves)
  }

  NewLayer(depth: number, isMaxing: boolean, a = Number.NEGATIVE_INFINITY, b = Number.POSITIVE_INFINITY): number {
    if (depth === 0) {
      return this.EvaluateBoard()
    }

    let best_move: string | null = null
    const fen = this.game.fen()
    const moves = shuffle(this.game.moves())
    let best_value = isMaxing ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i]
      if (isMaxing) {
        this.myMovesChecked++
      } else {
        this.opMovesChecked++
      }

      if (!this.game.move(move)) {
        console.log('move failed')
        continue
      }

      const value = this.NewLayer(depth - 1, !isMaxing, a, b)

      if (isMaxing) {
        if (value > best_value) {
          best_move = move
          best_value = value
        }
        a = Math.max(a, value)
      } else {
        if (value < best_value) {
          best_move = move
          best_value = value
        }
        b = Math.min(b, value)
      }

      this.game.load(fen, { skipValidation: true })
      if (b <= a) {
        break
      }
    }

    this.bestMove = best_move || moves[0]
    return best_value
  }

  get isMyGo() {
    return this.game.turn() === this.colour
  }

  EvaluateBoard() {
    const board = this.game.board()

    if (this.game.isCheckmate()) {
      return this.isMyGo ? CHECK_MATE_VALUE : -CHECK_MATE_VALUE
    }

    let b = 0
    let w = 0
    for (let i = 0; i < board.length; i++)
      for (let y = 0; y < board[i].length; y++) {
        const column = board[i][y]
        if (!column) continue

        const val = MINIMAX_VALS[column.type]
        if (column.color === 'w') w += val
        else b += val
      }

    return this.colour === 'w' ? w - b : b - w
  }
}

export function quickGetMove({ fen }: MoveRequest): MoveResponse {
  const node = new MiniMacsNode(fen)
  const strt = performance.now()
  const rating = node.NewLayer(4, true)
  return {
    move: node.bestMove,
    rating,
    details: `Total Moves Searched: ${node.myMovesChecked + node.opMovesChecked}. My Moves: ${node.myMovesChecked} Ops Moves: ${node.opMovesChecked}`,
    timeTaken: timeTaken(strt),
  }
}
