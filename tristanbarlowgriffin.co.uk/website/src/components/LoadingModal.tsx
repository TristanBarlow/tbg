import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

interface Props {
  hideBG?: boolean
}
export default function LoadingModal (props: Props) {
  return (
    <div className='modal is-active rounded'>
      {!props.hideBG && <div className="modal-background" /> }
      <Flex>
        <Spinner color={ props.hideBG ? 'black' : "white" } size="xl" />
      </Flex>
    </div>
  )
}