import { invertColour, newBoard } from '../../chess'
import { PlayerColour } from '../chessPlayer'
import { shuffle } from '../../../ts/util'
import { MoveRequest, MoveResponse, timeTaken } from '../types'
import { Chess, Color, PieceSymbol } from 'chess.js'

const ROUND_ROBIN_VALS: { [key in PieceSymbol]: number } = {
  p: 0.1,
  r: 0.5,
  n: 0.3,
  b: 0.3,
  q: 0.9,
  k: 0.10,
}

const CHECK_MATE_VALUE = 1
export class RoundRobin {
  game: Chess
  moves: string[]
  maxDepth = 0
  startedAt: number = performance.now()
  colour: PlayerColour
  rootNode: RoundRobinNode

  constructor(private fen: string, private maxProcessingMs: number) {
    this.game = newBoard(fen)
    this.colour = this.game.turn()
    const moves = this.game.moves()
    this.moves = shuffle(moves)
    this.rootNode = new RoundRobinNode(null, null, this.colour, this.game, this.fen, 1)
  }

  get isOutOfTime() {
    return (performance.now() - this.startedAt) > this.maxProcessingMs
  }

  getMove() {
    const moves = this.rootNode.populateNode()
    while (!this.isOutOfTime) {
      this.rootNode.iterateNode({
        acc: 0,
        max: 1000,
      })
    }

    this.rootNode.updateScores()
    console.log(this.rootNode)
    const bestMove = this.rootNode.nodes?.at(0)
    return {
      move: bestMove?.move ?? moves[0],
      rating: bestMove?.eval ?? 0,
    }
  }

  get isMyGo() {
    return this.game.turn() === this.colour
  }
}

function loadGame(game: Chess, fen: string) {
  game.load(fen, { skipValidation: true })
}

type Counter = {
  acc: number
  max: number
}

class RoundRobinNode {
  score: number
  eval: number
  playerMove: Color
  opMoves = 0
  myMoves = 0
  nodes: RoundRobinNode[] | null = null
  isMaximiser: boolean

  constructor(private parentNode: RoundRobinNode | null, readonly move: string | null, public maxingColour: Color, private game: Chess, private fen: string, public depth: number) {
    this.playerMove = invertColour(this.game.turn())
    this.eval = this.evaluateBoard()
    this.score = this.eval
    this.isMaximiser = this.playerMove === maxingColour

    let parent = this.parentNode
    while (parent) {
      if (!parent?.parentNode) {
        const wasMyMove = this.playerMove === this.maxingColour
        if (wasMyMove) {
          parent.myMoves++
        } else {
          parent.opMoves++
        }
      }
      parent = parent.parentNode
    }
  }

  iterateNode(counter: Counter) {
    if (counter.acc >= counter.max) return false
    if (!this.nodes) {
      this.populateNode()
      return true
    }
    this.nodes.forEach((n) => {
      const out = n.iterateNode(counter)
      if (out) {
        counter.acc++
      }
    })
    this.updateScores()
  }

  populateNode() {
    loadGame(this.game, this.fen)
    const moves = this.game.moves()
    this.nodes = new Array(moves.length)
    for (let i = 0; i < moves.length; i++) {
      loadGame(this.game, this.fen)
      const move = moves[i]
      if (!this.game.move(move)) {
        continue
      }

      const node = new RoundRobinNode(this, move, this.maxingColour, this.game, this.game.fen(), this.depth + 1)
      this.nodes.push(node)
    }
    this.updateScores()
    return moves
  }

  updateScores() {
    if (!this.nodes) return
    this.sortNode()
    this.score = this.nodes.at(0)?.score ?? this.eval
    if (this.parentNode) {
      this.parentNode.updateScores()
    }
  }

  sortNode() {
    if (!this.nodes) return
    this.nodes.sort((a, b) => {
      if (this.isMaximiser) {
        return a.score - b.score
      }
      return b.score - a.score
    })
  }

  evaluateBoard() {
    const board = this.game.board()

    if (this.game.isCheckmate()) {
      if (this.game.turn() === this.maxingColour) return -CHECK_MATE_VALUE
      return CHECK_MATE_VALUE
    }

    let score = 0
    for (let i = 0; i < board.length; i++)
      for (let y = 0; y < board[i].length; y++) {
        const piece = board[i][y]
        if (!piece) continue

        const value = ROUND_ROBIN_VALS[piece.type]
        score += this.maxingColour === piece.color
          ? value
          : -value
      }

    return score
  }
}

export function quickGetMove({ fen, maxTime }: MoveRequest): MoveResponse {
  const player = new RoundRobin(fen, maxTime)
  const strt = performance.now()
  const { move, rating } = player.getMove()
  return {
    move,
    rating,
    details: `Total Moves Searched: ${player.rootNode.myMoves + player.rootNode.opMoves}. My Moves: ${player.rootNode.myMoves} Ops Moves: ${player.rootNode.opMoves}. Rating: ${rating}`,
    timeTaken: timeTaken(strt),
  }
}
