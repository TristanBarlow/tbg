import React, { useRef, useState } from 'react'
import { ChessPlayer, PlayersTypes, PlayerFactory, PlayerColour, MoveResponse } from '../../ts/chess/players'
import ChessBoard from './ChessBoard'
import Button, { Colors } from '../Button'
import MySelect from '../MySelect'
import { Flex, Grid } from '@chakra-ui/core'

const playerOptions = Object.values(PlayersTypes)
interface Props {

}
export default function ChessController() {
  const [paused, setPauses] = useState(true)
  const [black, setBlack] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [white, setWhite] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [blackLog, setBlackLog] = useState<string[]>([])
  const [whiteLog, setWhiteLog] = useState<string[]>([])

  const undo = useRef<() => void>()

  function updateStats(color: PlayerColour, response: MoveResponse) {
    if (color === 'white') {
      setWhiteLog([...whiteLog, response.rating.toString()])
    } else {
      setBlackLog([...blackLog, response.rating.toString()])
    }
  }

  return (
    <Flex w="100%" justifyContent="center">
      <Grid w="100%" maxW="1020px" columnGap="10px" rowGap={2} justifyContent="center" templateColumns="repeat(auto-fill, 500px)">
        <ChessBoard
          setUndo={(x) => undo.current = x}
          onMove={updateStats}
          black={black}
          pause={paused}
          white={white} />
        <Flex flexDirection="column">
          <Grid w="100%" h="fit-content" columnGap="10px" rowGap={2} justifyContent="center" templateColumns="1fr 1fr">
            <MySelect
              label="White"
              value={white.name}
              options={playerOptions}
              change={(x) => x && setWhite(PlayerFactory(x))} />

            <MySelect
              label="Black"
              value={black.name}
              options={Object.values(PlayersTypes)}
              change={(x) => x && setBlack(PlayerFactory(x))} />
            <Button
              color={Colors.INFO}
              label={paused ? 'Start' : 'Pause'}
              onClick={() => { setPauses(!paused) }} />

            <Button
              color={Colors.INFO}
              label="UNDO"
              onClick={() => {
                setPauses(true)
                if (undo.current) {
                  undo.current()
                }
              }} />
          </Grid>
          <Flex bg="white" mt={2} className="shadow-1" flexDirection="column" h="300px">
            <div>{whiteLog}</div>
            <div>{blackLog}</div>
          </Flex>
        </Flex>
      </Grid>
    </Flex>)
}