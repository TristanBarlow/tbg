import { useMemo, useState } from 'react'
import { PLAYER_OPTIONS, PlayerFactory, RANDOM_TYPE } from './players'
import { ChessboardWithControls } from './ChessBoard'
import MySelect from '../components/MySelect'
import { Flex, Grid } from '@chakra-ui/react'
import { getUnixTime } from 'date-fns'
import { useWindowSize } from '../ts/resize'
import { Log, ChessLog } from './ChessLog'
import { generate } from 'short-uuid'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { z } from 'zod'
import { MoveResponse, PlayerColour } from '@tbg/chess-bots'

const playerSchema = z.enum(PLAYER_OPTIONS)
export default function ChessController() {
  const [blackType, setBlackType] = useLocalStorageState('black', playerSchema, RANDOM_TYPE)
  const [whiteType, setWhiteType] = useLocalStorageState('white', playerSchema, RANDOM_TYPE)
  const [windowWidth] = useWindowSize()
  const [logs, setLogs] = useState<Log[]>([])

  const white = useMemo(() => PlayerFactory(whiteType), [whiteType])
  const black = useMemo(() => PlayerFactory(blackType), [blackType])

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
              value={whiteType}
              options={PLAYER_OPTIONS}
              change={x => x && setWhiteType(x)}
            />
            <MySelect
              label="Black"
              value={blackType}
              options={PLAYER_OPTIONS}
              change={x => x && setBlackType(x)}
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
