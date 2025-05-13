import React, { useState } from 'react'
import { ImageMeta, isMeta } from '@tbg/types'
import { Image, Skeleton, SkeletonProps } from '@chakra-ui/react'
import { CFG } from '../env'

interface Props extends SkeletonProps {
  meta: ImageMeta | string
  loadSize?: number
}
export default function ImageEle (props: Props) {
  const [loaded, setLoaded] = useState(false)
  const { meta } = props
  const src = `${ CFG.SERVER_URL }/api/image/${ isMeta(meta) ? meta.name : meta }`
  const description = isMeta(meta) && meta.description
  return <Skeleton
    display="flex"
    pos="relative"
    isLoaded={ loaded } { ...props }
    overflow="hidden"
  >
    <Image
      mt="auto"
      w="100%"
      h="100%"
      onLoad={ () => setLoaded(true) }
      objectFit='cover'
      alt={ description || '' }
      src={ src }
    />
  </Skeleton>
}
