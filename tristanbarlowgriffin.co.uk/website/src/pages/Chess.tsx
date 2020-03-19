import React from 'react'
import ChessController from '../components/chess/ChessController'
export default class ChessPage extends React.Component<{}>{
  componentDidMount () {

  }

  render () {
    return (
      <div className="row around">
        <ChessController />
      </div>
    )
  }
}