import React from 'react'
import { ChessPlayer, PlayersTypes, PlayerFactory } from '../../ts/chess/players'
import ChessBoard from './ChessBoard'
import Button, { Colors } from '../Button'
import OptionSelecta from '../OptionSelecta'
import { withRouter } from 'react-router'

interface State {
  white: ChessPlayer
  black: ChessPlayer

  showControls: boolean
}
interface Props {

}
export default class ChessController extends React.Component<Props, State>{
  constructor (p: Props) {
    super(p)
    this.state = {
      showControls: false,
      black: PlayerFactory(PlayersTypes.RANDOM),
      white: PlayerFactory(PlayersTypes.RANDOM)
    }
  }

  get controls (): JSX.Element | null {
    if (!this.state.showControls) return null
    return (
      <div>
        <OptionSelecta<PlayersTypes>
          value={ this.state.white.name }
          options={ Object.values(PlayersTypes) }
          onChange={ (x) => this.setState({ white: PlayerFactory(x) }) } />
      </div>
    )
  }

  render () {
    return (
      <div>
        <div className="tile around">
          <ChessBoard black={ this.state.black } white={ this.state.white } />
          <div className="column">
            <Button
              color={ Colors.INFO }
              label={ this.state.showControls ? 'Hide' : 'Show' }
              onClick={ () => { this.setState({ showControls: !this.state.showControls }) } } />
            { this.controls }
          </div>
        </div>
      </div>
    )
  }
}