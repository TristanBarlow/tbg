import { Flex, Box, Text } from '@chakra-ui/react'
import { isString } from 'lodash'

export interface MySelectProps<T extends string> {
  label?: string
  value: T | null
  change: (t: T | null) => void
  options: string[]
}
export default function MySelect<T extends string>(props: MySelectProps<T>) {
  const label = props.label && (
    <Text mb={1} fontWeight="700">
      {' '}
      { props.label }
    </Text>
  )
  const selectProps = {
    value: props.value,
    onChange: ({ target }: React.FormEvent<HTMLDivElement>) => {
      if ('value' in target && isString(target.value)) {
        const str = target.value as T
        props.change(str || null)
      }
    },
  }

  return (
    <Flex minW="100px" flexDirection="column" {...props}>
      { label }
      <Flex style={{ width: 'fit-content' }} className="select">
        <Box {...selectProps} as="select">
          { props.options.map(x => (<option key={x} value={x}>{ x }</option>)) }
        </Box>
      </Flex>
    </Flex>
  )
}
