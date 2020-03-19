import React from 'react'
import Renderer, { Piece } from 'chessboardjsx'
import { newBoard, ChessInstance, Square, ShortMove } from '../ts/chess/chess'
import { ChessPlayer } from '../ts/chess/players/chessPlayer'

interface Drop {
  sourceSquare: Square
  targetSquare: Square
  piece: Piece
}

interface Props {
  white: ChessPlayer
  black: ChessPlayer
}
interface State {
  fen: string
  orientation: 'white' | 'black'
}

export default class ChessBoard extends React.Component<Props, State>{
  game: ChessInstance

  constructor (p: Props) {
    super(p)
    this.game = newBoard()
    this.state = {
      fen: this.game.fen(),
      orientation: this.currentIsHuman ? 'white' : 'black'
    }

    this.getMove()
  }

  get currentIsHuman (): boolean {
    return this.currentPlayer.isHuman
  }

  get currentPlayer (): ChessPlayer {
    const turn = this.game.turn()
    return turn === 'w' ? this.props.white : this.props.black
  }

  async getMove () {
    if (this.currentIsHuman) {
      return
    }

    const move = await this.currentPlayer.getMove(this.game.fen())
    if (!move) {
      this.checkGameOver()
      return
    }

    await this.makeMove(move)
  }

  checkGameOver () {
    return this.game.game_over() ||
      this.game.in_draw()
  }

  updateBoard (): Promise<void> {
    return new Promise<void>((resolve) => {
      this.setState({ fen: this.game.fen() }, resolve)
    })
  }

  async makeMove (move: ShortMove | string): Promise<void> {
    const result = this.game.move(move)
    if (result === null) {
      console.log('Illegal move')
    }

    await this.updateBoard()
    if (this.checkGameOver()) {
      this.game.reset()
    }

    setTimeout(() => this.getMove(), 1000)
  }

  onDrop (drop: Drop) {
    if (!this.currentIsHuman) {
      return
    }

    this.makeMove({
      from: drop.sourceSquare,
      to: drop.targetSquare,
      promotion: 'q'
    })
  }

  render () {
    return (
      <Renderer
        calcWidth={ () => 500 }
        orientation={ this.state.orientation }
        position={ this.state.fen }
        onDrop={ (x: Drop) => this.onDrop(x) }
      />
    )
  }
}