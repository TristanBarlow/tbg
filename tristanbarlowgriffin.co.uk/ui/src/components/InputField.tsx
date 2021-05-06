import { Flex, FlexProps, Text } from '@chakra-ui/react'
import React from 'react'

interface Props extends FlexProps {
  value: string
  change: (str: string) => void
  label: string
  clazz?: string
  type?: string
}
export default function InputField (props: Props) {
  return (
    <Flex w="100%" flexDir="column" { ...props }>
      <Text className="label">{ props.label }</Text>
      <input
        value={ props.value }
        onChange={ (x) => props.change(x.target.value) }
        className={ props.clazz || 'input' }
        type={ props.type || 'text' } />
    </Flex>
  )
}