import { useState } from 'react'
import { PlayersTypes, PlayerFactory, PlayerColour, MoveResponse } from './players'
import { ChessboardWithControls } from './ChessBoard'
import MySelect from '../components/MySelect'
import { Flex, Grid } from '@chakra-ui/react'
import { getUnixTime } from 'date-fns'
import { useWindowSize } from '../ts/resize'
import { Log, ChessLog } from './ChessLog'
import { generate } from 'short-uuid'

const playerOptions = Object.values(PlayersTypes)
export default function ChessController() {
  const [black, setBlack] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [white, setWhite] = useState(PlayerFactory(PlayersTypes.RANDOM))
  const [windowWidth] = useWindowSize()
  const [logs, setLogs] = useState<Log[]>([])

  function updateStats(color: PlayerColour, response: MoveResponse) {
    const time = getUnixTime(new Date())
    const log: Log = {
      id: generate(),
      time,
      botName: color === 'w' ? white.name : black.name,
      color,
      details: response.details,
    }
    setLogs([log, ...logs])
  }

  const columns = `repeat(auto-fill, ${windowWidth > 500 ? 500 : 310}px)`
  return (
    <Flex w="100%" justifyContent="center">
      <Grid py={1} w="100%" maxW="1020px" gridGap=".5rem" justifyContent="center" templateColumns={columns}>
        <Flex flexDirection="column">
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
          <ChessboardWithControls
            onMove={updateStats}
            black={black}
            white={white}
          />
        </Flex>
        <ChessLog logs={logs} />
      </Grid>
    </Flex>
  )
}
