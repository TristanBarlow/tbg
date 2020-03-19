import React from 'react'
import ChessBoard from '../components/ChessBoard'
import { RandomBot, Human } from '../ts/chess/players'
export default class ChessPage extends React.Component<{}>{
  componentDidMount () {

  }

  render () {
    return (
      <div className="row around">
        <ChessBoard black={ new RandomBot() } white={ new Human() } />
        <ChessBoard black={ new RandomBot() } white={ new RandomBot() } />
      </div>
    )
  }
}