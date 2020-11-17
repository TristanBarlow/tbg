import React, { useEffect, useState } from 'react'
import { Flex, FlexProps, PseudoBox, Text } from '@chakra-ui/core'

export interface MySelectProps<T extends string> {
  label?: string
  value: T | null
  change: (t: T | null) => void
  options: string[]
}
export default function MySelect<T extends string>(props: MySelectProps<T>) {
  const label = props.label && <Text mb={1} fontWeight="700"> {props.label}</Text>
  return (
    <Flex minW="100px" flexDirection="column" {...props}>
      { label}
      <Flex style={{ width: 'fit-content' }} className="select">
        <PseudoBox as="select" >
          {props.options.map(x => (<option key={x} value={x}>{x}</option>))}
        </PseudoBox>
      </Flex>
    </Flex>
  )
}