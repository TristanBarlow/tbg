import { ChessPlayer } from './chessPlayer'
import { MoveResponse, PlayersTypes } from './types'
import { CFG } from '../../cfg'

export class TreeSearch extends ChessPlayer {
  name = PlayersTypes.TreeSearch
  isHuman = false
  statHistory = ''

  async getMove (fen: string): Promise<MoveResponse | null> {
    const res = await fetch(`${CFG.REACT_APP_CHESS_SERVER}/chess/move`, {
      method:'POST',
      headers: new Headers([['Content-Type', 'application/json']]),
      body: JSON.stringify({
        id: "f",
        fen
      })
    })

    if(!res.ok) {
      console.error("Failed to get move: ", await res.text())
      return null
    }

    const body = await res.json()
    console.log(body)
    return {
      move: body.value,
      details: '',
      rating: 1,
      timeTaken: 10
    }
  }

  get stats (): string {
    return this.statHistory
  }
}
