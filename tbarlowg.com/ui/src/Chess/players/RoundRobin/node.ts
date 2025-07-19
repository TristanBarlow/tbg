import { invertColour, newBoard } from '../../chess'
import { shuffle } from '../../../ts/util'
import { MoveRequest, MoveResponse } from '../types'
import { Chess, Color, PieceSymbol } from 'chess.js'
import { sumBy } from 'lodash'

const ROUND_ROBIN_VALS: { [key in PieceSymbol]: number } = {
  p: 0.1,
  r: 0.5,
  n: 0.3,
  b: 0.4,
  q: 0.9,
  k: 0.10,
}

const CHECK_MATE_VALUE = 1

function loadGame(game: Chess, fen: string) {
  game.load(fen, { skipValidation: true })
}

interface Node {
  children: Node[]
  move: string
  eval: number
  game: Chess
  fen: string
  isPopulated: boolean
  moveColour: Color
  parent: Node | null
  depth: number
  averageEval: number
}

function evaluateBoard(game: Chess) {
  const board = game.board()
  const maxingColour = invertColour(game.turn())

  if (game.isCheckmate()) {
    return CHECK_MATE_VALUE
  }

  let score = 0
  for (let i = 0; i < board.length; i++)
    for (let y = 0; y < board[i].length; y++) {
      const piece = board[i][y]
      if (!piece) continue

      const value = ROUND_ROBIN_VALS[piece.type]
      score += maxingColour === piece.color
        ? value
        : -value
    }

  return score
}

function makeNode(move: string, fen: string, game: Chess, parent: Node | null): Node | null {
  const moveColour = game.turn()
  loadGame(game, fen)
  if (!game.move(move)) {
    return null
  }

  return {
    children: [],
    eval: evaluateBoard(game),
    fen: game.fen(),
    parent,
    game,
    move,
    isPopulated: false,
    moveColour: invertColour(moveColour),
    depth: (parent?.depth ?? 0) + 1,
    averageEval: 0,
  }
}

function populateNode(node: Node) {
  const game = node.game
  loadGame(game, node.fen)
  node.children = getNodeChildren(game, game.fen(), node)
  node.children.sort((a, b) => b.eval - a.eval)
  node.isPopulated = true
  node.averageEval = sumBy(node.children, c => c.eval) / node.children.length
}

function iterateNode(node: Node) {
  if (!node.isPopulated) {
    populateNode(node)
    return true
  }

  const child = node.children.find(c => !c.isPopulated)
  if (child) {
    populateNode(child)
    return true
  }
}

function getNodeChildren(game: Chess, fen: string, parentNode: Node | null) {
  return shuffle(game.moves())
    .map(move => makeNode(move, fen, game, parentNode))
    .filter((v): v is Node => !!v)
}

interface Counter {
  opMoves: number
  playerMoves: number
  opSum: number
  playerSum: number
}

function getNodeScore(node: Node, maxingPlayer: Color, counter: Counter) {
  if (node.moveColour === maxingPlayer) {
    counter.playerSum += node.eval / node.depth
    counter.playerMoves++
  } else {
    counter.opSum += node.eval / node.depth
    counter.opMoves++
  }

  node.children.forEach(c => getNodeScore(c, maxingPlayer, counter))
}

function getMove(fen: string, maxTime: number) {
  const start = performance.now()
  const game = newBoard(fen)
  const maxingColour = game.turn()
  const rootNodes = getNodeChildren(game, fen, null)
  let opMoves = 0
  let myMoves = 0
  while (performance.now() - start < maxTime) {
    rootNodes.forEach(n => iterateNode(n))
  }

  const nodesWithCount = rootNodes.map((node) => {
    const counter: Counter = {
      opMoves: 0,
      playerMoves: 0,
      playerSum: 0,
      opSum: 0,
    }

    getNodeScore(node, maxingColour, counter)

    opMoves += counter.opMoves
    myMoves += counter.playerMoves

    const playerAvg = counter.playerSum / counter.playerMoves
    const enemyAvg = counter.opSum / counter.opMoves
    return {
      node,
      counter,
      rating: playerAvg - enemyAvg,
    }
  })

  nodesWithCount.sort((a, b) => {
    return b.rating - a.rating
  })

  console.log(nodesWithCount)
  const [{ node, rating }] = nodesWithCount
  return {
    opMoves,
    myMoves,
    move: node.move,
    rating,
    timeTaken: performance.now() - start,
  }
}

export function quickGetMove({ fen, maxTime }: MoveRequest): MoveResponse {
  const { move, rating, myMoves, opMoves, timeTaken } = getMove(fen, maxTime)
  return {
    move,
    rating,
    details: `Total Moves Searched: ${myMoves + opMoves}. My Moves: ${myMoves} Ops Moves: ${opMoves}. Rating: ${rating}`,
    timeTaken: timeTaken,
  }
}
