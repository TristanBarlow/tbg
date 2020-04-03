import React from 'react'
import { ChessPlayer, PlayersTypes, PlayerFactory, PlayerColour, MoveResponse } from '../../ts/chess/players'
import ChessBoard from './ChessBoard'
import Button, { Colors } from '../Button'
import OptionSelecta from '../OptionSelecta'

interface State {
  white: ChessPlayer
  black: ChessPlayer
  paused: boolean
  showControls: boolean
  whiteLog: string
  blackLog: string
}
interface Props {

}
export default class ChessController extends React.Component<Props, State>{
  undo!: () => void
  constructor (p: Props) {
    super(p)
    this.state = {
      paused: true,
      showControls: false,
      black: PlayerFactory(PlayersTypes.RANDOM),
      white: PlayerFactory(PlayersTypes.RANDOM),
      blackLog: '',
      whiteLog: ''
    }
  }

  get controls (): JSX.Element | null {
    if (!this.state.showControls) return null
    return (
      <div>
        <OptionSelecta<PlayersTypes>
          label="White"
          value={ this.state.white.name }
          options={ Object.values(PlayersTypes) }
          onChange={ (x) => this.setState({ white: PlayerFactory(x) }) } />

        <OptionSelecta<PlayersTypes>
          label="Black"
          value={ this.state.black.name }
          options={ Object.values(PlayersTypes) }
          onChange={ (x) => this.setState({ black: PlayerFactory(x) }) } />

        <Button
          color={ Colors.INFO }
          label={ this.state.paused ? 'Start' : 'Pause' }
          onClick={ () => { this.setState({ paused: !this.state.paused }) } } />

        <Button
          color={ Colors.INFO }
          label="UNDO"
          onClick={ () => {
            this.setState({ paused: true })
            this.undo()
          } } />
      </div>
    )
  }

  get outPutLog (): JSX.Element {
    return (
      <div className="column">
        <div>{ this.state.whiteLog }</div>
        <div>{ this.state.blackLog }</div>
      </div>)
  }

  updateStats (color: PlayerColour, response: MoveResponse) {
    if (color === 'white') {
      this.setState({ whiteLog: this.state.whiteLog + (response.rating || '') })
    } else {
      this.setState({ blackLog: this.state.blackLog + (response.rating || '') })
    }
  }

  render () {
    return (
      <div>
        <div className="tile around">
          <ChessBoard
            setUndo={ (x) => this.undo = x }
            onMove={ (x, y) => this.updateStats(x, y) }
            black={ this.state.black }
            pause={ this.state.paused }
            white={ this.state.white } />
          <div>
            <div className="column">
              <Button
                color={ Colors.INFO }
                label={ this.state.showControls ? 'Hide' : 'Show' }
                onClick={ () => { this.setState({ showControls: !this.state.showControls }) } } />
              { this.controls }
              { this.updateStats }
            </div>
            { this.outPutLog }
          </div>
        </div>
      </div>
    )
  }
}