import React from 'react'
import ChessBoard from 'chessboardjsx'
import Chessboard from 'chessboardjsx'



export default class Chess extends React.Component<{}>{

  render() {
    return (
      <div style={{ width: '100px' }}>
        <Chessboard
          calcWidth={() => 500}
          position={"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"} />
      </div>
    )
  }
}