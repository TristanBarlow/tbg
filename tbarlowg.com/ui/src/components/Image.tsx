import { useState } from 'react'
import { Image, Skeleton, SkeletonProps } from '@chakra-ui/react'

interface Props extends SkeletonProps {
  uri: string
  loadSize?: number
}

export function ImageEle(props: Props) {
  const [loading, setIsLoading] = useState(true)
  const { uri } = props
  return (
    <Skeleton
      display="flex"
      pos="relative"
      loading={loading}
      {...props}
      overflow="hidden"
    >
      <Image
        mt="auto"
        w="100%"
        h="100%"
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        objectFit="cover"
        src={`/images/${uri}`}
      />
    </Skeleton>
  )
}
