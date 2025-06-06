import { useState } from 'react'
import { ImageMeta, isMeta } from '@tbg/types'
import { Image, Skeleton, SkeletonProps } from '@chakra-ui/react'
import { CFG } from '../env'

interface Props extends SkeletonProps {
  meta: ImageMeta | string
  loadSize?: number
}
export default function ImageEle(props: Props) {
  const [loading, setIsLoading] = useState(true)
  const { meta } = props
  const src = `${CFG.SERVER_URL}/api/image/${isMeta(meta) ? meta.name : meta}`
  const description = isMeta(meta) && meta.description
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
        alt={description || ''}
        src={src}
      />
    </Skeleton>
  )
}
