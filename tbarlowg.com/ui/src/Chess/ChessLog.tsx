import { useRef } from 'react'
import { Flex, Text } from '@chakra-ui/react'

export interface Log {
  id: string
  time: number
  color: string
  botName: string
  details: string
}

interface Props {
  logs: Log[]
}
export default function ChessLog({ logs }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null)
  // useEffect(() => {
  //   if (!endRef.current) return
  //   endRef.current.scrollIntoView({ behavior: 'smooth' })
  // }, [logs])
  return (
    <Flex py={1} px={2} overflowX="scroll" bg="white" mt={2} className="shadow-1" flexDirection="column" h="300px">
      {
        logs.map(log => (
          <Flex mb={1} flexDirection="column" key={log.id}>
            <Flex flexDirection="row">
              <Text fontWeight="600" mr={1}>{ log.color }</Text>
              <Text>
                { log.botName }
                :
              </Text>
            </Flex>
            <Flex ml={5}>{ log.details }</Flex>
          </Flex>
        ))
      }
      <div ref={endRef} />
    </Flex>
  )
}
