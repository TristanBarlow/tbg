import { Flex, Text } from '@chakra-ui/react'
import { colourLookup } from './ChessBoard'
import { Color } from 'chess.js'

export interface Log {
  id: string
  time: number
  color: Color
  botName: string
  details: string
}

interface Props {
  logs: Log[]
}
export function ChessLog({ logs }: Props) {
  return (
    <Flex
      py={1}
      px={2}
      overflowX="scroll"
      bg="white"
      mt={2}
      className="shadow-1"
      flexDirection="column"
      h="300px"
    >
      {
        logs.map(log => (
          <Flex mb={1} flexDirection="column" key={log.id}>
            <Flex flexDirection="row">
              <Text textTransform="uppercase" fontWeight="600" mr={1}>
                { colourLookup[log.color] }
                {' '}
                (
                { log.botName }
                )
              </Text>
            </Flex>
            <Flex ml={5}>{ log.details }</Flex>
          </Flex>
        ))
      }
    </Flex>
  )
}
