import { Flex } from '@chakra-ui/react'
import ChessController from './ChessController'
import MyHelmet from '../components/MyHelmet'

export function ChessPage() {
  return (
    <Flex w="100%" justifyContent="center" flexDir="column">
      <MyHelmet title="TBG - Chess" description="This is a selection of chess bots written by myself that play against eachother (or you). The portfolio of bots will grow as I find more time to work on them" />
      <p className="title is-3 is-size-5-mobile">Portfolio of chess bots (WIP)</p>
      <ChessController />
    </Flex>
  )
}
