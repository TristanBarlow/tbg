import React, { useRef, useState } from 'react'
import { ChessPlayer, PlayersTypes, PlayerFactory, PlayerColour, MoveResponse } from '../../ts/chess/players'
import ChessBoard from './ChessBoard'
import Button, { Colors } from '../Button'
import OptionSelecta from '../OptionSelecta'
import { Flex } from '@chakra-ui/core'

const playerOptions = Object.values(PlayersTypes)
interface Props {

}
export default function ChessController () {
  const [paused, setPauses] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [black, setBlack] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [white, setWhite] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [blackLog, setBlackLog] = useState<string[]>([])
  const [whiteLog, setWhiteLog] = useState<string[]>([])

  const undo = useRef<() => void>()

  function updateStats (color: PlayerColour, response: MoveResponse) {
    if (color === 'white') {
      setWhiteLog([...whiteLog, response.rating.toString()])
    } else {
      setBlackLog([...blackLog, response.rating.toString()])
    }
  }

  const controls = showControls && (
    <Flex flexDirection="column" w="100%">
      <OptionSelecta<PlayersTypes>
        label="White"
        value={ white.name }
        options={ playerOptions }
        onChange={ (x) => setWhite(PlayerFactory(x)) } />

      <OptionSelecta<PlayersTypes>
        label="Black"
        value={ black.name }
        options={ Object.values(PlayersTypes) }
        onChange={ (x) => setBlack(PlayerFactory(x)) } />

      <Button
        color={ Colors.INFO }
        label={ paused ? 'Start' : 'Pause' }
        onClick={ () => { setPauses(!paused) } } />

      <Button
        color={ Colors.INFO }
        label="UNDO"
        onClick={ () => {
          setPauses(true)
          if (undo.current) {
            undo.current()
          }
        } } />
    </Flex>
  )

  return < Flex >
    <Flex flexDirection="row" flexWrap="wrap" justify="center" p={ 1 }>
      <ChessBoard
        setUndo={ (x) => undo.current = x }
        onMove={ updateStats }
        black={ black }
        pause={ paused }
        white={ white } />
      <Flex>
        <Flex className="column">
          <Button
            color={ Colors.INFO }
            label={ showControls ? 'Hide' : 'Show' }
            onClick={ () => { setShowControls(!showControls) } } />
          { controls }
        </Flex>
        <Flex flexDirection="column">
          <div>{ whiteLog }</div>
          <div>{ blackLog }</div>
        </Flex>
      </Flex>
    </Flex>
  </Flex >
}