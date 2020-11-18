import React, { useRef, useState } from 'react'
import { PlayersTypes, PlayerFactory, PlayerColour, MoveResponse } from '../../ts/chess/players'
import ChessBoard from './ChessBoard'
import Button, { Colors } from '../Button'
import MySelect from '../MySelect'
import { Flex, Grid } from '@chakra-ui/core'
import { getUnixTime } from 'date-fns'
import ChessLog, { Log } from './ChessLog'

const playerOptions = Object.values(PlayersTypes)
export default function ChessController () {
  const [paused, setPaused] = useState(false)
  const [black, setBlack] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [white, setWhite] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [logs, setLogs] = useState<Log[]>([])

  const undo = useRef<() => void>()

  function updateStats (color: PlayerColour, response: MoveResponse) {
    const log: Log = {
      time: getUnixTime(new Date()),
      botName: color === 'w' ? white.name : black.name,
      color,
      details: response.details
    }
    setLogs([...logs, log])
  }

  return (
    <Flex w="100%" justifyContent="center">
      <Grid w="100%" maxW="1020px" columnGap="10px" rowGap={ 2 } justifyContent="center" templateColumns="repeat(auto-fill, 500px)">
        <ChessBoard
          setUndo={ (x) => undo.current = x }
          onMove={ updateStats }
          black={ black }
          pause={ paused }
          white={ white } />
        <Flex flexDir="column">
          <Flex flexDir="column" w="100%" h="fit-content">
            <Flex mb={ 2 } justifyContent="space-around" flexDirection="row" w="100%">
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
            </Flex>
            <Flex w="100%" justifyContent="space-around">
              <Button
                color={ Colors.INFO }
                label={ paused ? 'Start' : 'Pause' }
                click={ () => { setPaused(!paused) } }
              />

              <Button
                color={ Colors.INFO }
                label="Undo"
                click={ () => {
                  setPaused(true)
                  if (undo.current) {
                    undo.current()
                  }
                } }
              />
            </Flex>
          </Flex>
          <ChessLog logs={ logs } />
        </Flex>
      </Grid>
    </Flex>)
}