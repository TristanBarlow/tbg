import React from 'react'
import Renderer, { Piece } from 'chessboardjsx'
import { newBoard, ChessInstance, Square, ShortMove, Move } from '../../ts/chess/chess'
import { ChessPlayer, PlayerColour } from '../../ts/chess/players/chessPlayer'
import { MoveResponse } from '../../ts/chess/players'

type SquaresCSS = Pick<Renderer['props'], 'squareStyles'>['squareStyles']

interface Drop {
  sourceSquare: Square
  targetSquare: Square
  piece: Piece
}

interface Props {
  white: ChessPlayer
  black: ChessPlayer
  pause: boolean
  onMove: (player: PlayerColour, moveResponse: MoveResponse) => void
  setUndo: (undo: () => void) => void
}
interface State {
  fen: string
  history: string[]
  orientation: PlayerColour
  lastMove: Move | null
}

export default class ChessBoard extends React.Component<Props, State>{
  game: ChessInstance

  constructor (p: Props) {
    super(p)
    this.undo = this.undo.bind(this)
    p.setUndo(this.undo)

    this.game = newBoard()
    this.state = {
      fen: this.game.fen(),
      history: [this.game.fen()],
      orientation: this.currentIsHuman ? 'white' : 'black',
      lastMove: null
    }

    this.getMove()
  }

  undo () {
    const lastMove = this.game.undo()
    console.log('UNDO', lastMove)
    if (!lastMove) {
      console.log('NO MOVE TO UNDO')
      return
    }

    this.setState({ lastMove: null, fen: this.game.fen() }, () => {
      this.forceUpdate()
    })
  }

  get currentIsHuman (): boolean {
    return this.currentPlayer.isHuman
  }

  get currentPlayerColour (): PlayerColour {
    const turn = this.game.turn()
    return turn === 'w' ? 'white' : 'black'
  }

  get currentPlayer (): ChessPlayer {
    const turn = this.game.turn()
    return turn === 'w' ? this.props.white : this.props.black
  }

  get lastPlayerColour (): PlayerColour {
    const turn = this.game.turn()
    return turn === 'w' ? 'black' : 'white'
  }

  get lastPlayer (): ChessPlayer {
    const turn = this.game.turn()
    return turn === 'w' ? this.props.black : this.props.white
  }

  async getMove () {
    if (this.currentIsHuman || this.props.pause) {
      return
    }

    const response = await this.currentPlayer.getMove(this.game.fen())
    if (!response?.move) {
      this.checkGameOver()
      return
    }

    await this.makeMove(response.move)
    this.props.onMove(this.lastPlayerColour, response)
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
    if (this.props.pause) return

    const result = this.game.move(move)
    if (result === null) {
      console.log('Illegal move')
      return
    }

    this.setState({ lastMove: result })

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

  async componentDidUpdate (prev: Props) {
    if (!this.props.pause && prev.pause) {
      return this.getMove()
    }

    if ((this.props.white !== prev.white) ||
      (this.props.black !== prev.black)) {
      return this.getMove()
    }
  }

  get fromCSS (): React.CSSProperties {
    return {
      backgroundColor: 'grey',
      transitionDuration: '0.1s'
    }
  }

  get toCSS (): React.CSSProperties {
    return {
      backgroundColor: 'yellow',
      transitionDuration: '0.2s'
    }
  }

  get tileColours (): SquaresCSS {
    const move = this.state.lastMove
    if (!move) return {}
    return {
      [move.to]: this.toCSS
    }
  }

  render () {
    console.log('FENN', this.state.fen)
    return (
      <Renderer
        undo={ true }
        calcWidth={ () => window.outerWidth < 450 ? 350 : 500 }
        orientation={ this.state.orientation }
        showNotation={ true }
        draggable={ this.currentIsHuman }
        squareStyles={ this.tileColours }
        position={ this.state.fen }
        onDrop={ (x: Drop) => this.onDrop(x) }
      />
    )
  }
}