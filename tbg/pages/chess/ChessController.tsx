import React, { useCallback, useRef, useState } from 'react'
import { PlayersTypes, PlayerFactory, PlayerColour, MoveResponse } from '../../ts/chess/players'
import ChessBoard from './ChessBoard'
import { getUnixTime } from 'date-fns'
import ChessLog, { Log } from './ChessLog'
import MySelect from 'components/select'
import { useWindowSize } from 'common/responsive'

const playerOptions = Object.values(PlayersTypes)
export default function ChessController () {
  const [paused, setPaused] = useState(false)
  const [black, setBlack] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [white, setWhite] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const size = useWindowSize()
  const w = size?.width || 0
  const [logs, setLogs] = useState<Log[]>([])

  const undo = useRef<() => void>()

  function updateStats (color: PlayerColour, response: MoveResponse) {
    const time = getUnixTime(new Date())
    const log: Log = {
      id: `${ color }-${ time }`,
      time,
      botName: color === 'w' ? white.name : black.name,
      color,
      details: response.details
    }
    setLogs([...logs, log])
  }
  const undoCB = useCallback(()=> {
    setPaused(true)
    if (undo.current) {
      undo.current()
    }
  }, [undo])
  const columns = `repeat(auto-fill, ${ w > 500 ? 500 : 320 }px)`
  return (
    <div>
      <div>
        <ChessBoard
          setUndo={ (x) => undo.current = x }
          onMove={ updateStats }
          black={ black }
          pause={ paused }
          white={ white } />
        <div>
          <div>
            <div>
              <MySelect
                label="White"
                value={ white.name }
                options={ playerOptions }
                change={ (x) => x && setWhite(PlayerFactory(x)) } />

              <MySelect
                label="Black"
                value={ black.name }
                options={ playerOptions }
                change={ (x) => x && setBlack(PlayerFactory(x)) } />
            </div>
            <div>
              <button onClick={ () => { setPaused(!paused) } }>
                { paused ? 'Start' : 'Pause' }
              </button>

              <button
                onClick={ undoCB }
              >Undo</button>
            </div>
          </div>
          <ChessLog logs={ logs } />
        </div>
      </div>
    </div >)
}
