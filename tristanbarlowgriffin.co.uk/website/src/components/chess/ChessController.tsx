import React from 'react'
import { ChessPlayer, PlayersTypes, PlayerFactory } from '../../ts/chess/players'
import ChessBoard from './ChessBoard'

interface State {
  white: ChessPlayer
  black: ChessPlayer
}
interface Props {

}
export default class ChessController extends React.Component<Props, State>{
  constructor (p: Props) {
    super(p)
    this.state = {
      black: PlayerFactory(PlayersTypes.RANDOM),
      white: PlayerFactory(PlayersTypes.RANDOM)
    }
  }

  render () {
    return (
      <div>
        <ChessBoard black={ this.state.black } white={ this.state.white } />
      </div>
    )
  }
}