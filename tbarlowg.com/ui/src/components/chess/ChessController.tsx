import { useRef, useState } from 'react'
import { PlayersTypes, PlayerFactory, PlayerColour, MoveResponse } from '../../ts/chess/players'
import { ChessboardWithControls } from './ChessBoard'
import Button, { Colors } from '../Button'
import MySelect from '../MySelect'
import { Flex, Grid } from '@chakra-ui/react'
import { getUnixTime } from 'date-fns'
import { useWindowSize } from '../../ts/resize'
import ChessLog, { Log } from './ChessLog'

const playerOptions = Object.values(PlayersTypes)
export default function ChessController() {
  const [paused, setPaused] = useState(false)
  const [black, setBlack] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [white, setWhite] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [w] = useWindowSize()
  const [logs, setLogs] = useState<Log[]>([])

  function updateStats(color: PlayerColour, response: MoveResponse) {
    const time = getUnixTime(new Date())
    const log: Log = {
      id: `${color}-${time}`,
      time,
      botName: color === 'w' ? white.name : black.name,
      color,
      details: response.details,
    }
    setLogs([...logs, log])
  }

  const columns = `repeat(auto-fill, ${w > 500 ? 500 : 320}px)`
  return (
    <Flex w="100%" justifyContent="center">
      <Grid py={1} w="100%" maxW="1020px" columnGap="10px" rowGap={2} justifyContent="center" templateColumns={columns}>
        <ChessboardWithControls
          onMove={updateStats}
          black={black}
          isPaused={paused}
          white={white}
        />
        <Flex flexDir="column">
          <Flex flexDir="column" w="100%" h="fit-content">
            <Flex mb={2} justifyContent="space-around" flexDirection="row" w="100%">
              <MySelect
                label="White"
                value={white.name}
                options={playerOptions}
                change={x => x && setWhite(PlayerFactory(x))}
              />
              <MySelect
                label="Black"
                value={black.name}
                options={playerOptions}
                change={x => x && setBlack(PlayerFactory(x))}
              />
            </Flex>
            <Flex w="100%" justifyContent="space-around">
              <Button
                color={Colors.INFO}
                label={paused ? 'Start' : 'Pause'}
                onClick={() => { setPaused(!paused) }}
              />
            </Flex>
          </Flex>
          <ChessLog logs={logs} />
        </Flex>
      </Grid>
    </Flex>
  )
}
