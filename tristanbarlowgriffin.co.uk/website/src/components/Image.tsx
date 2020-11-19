import React from 'react'
import { ImageMeta, isMeta } from '@tbg/types'
import { Image, ImageProps } from '@chakra-ui/react'

interface Props extends ImageProps {
  meta: ImageMeta | string
  loadSize?: number
  width?: string,
  height?: string
}
export default function ImageEle (props: Props) {
  const { meta, width, height } = props
  const src = `${ process.env.REACT_APP_SERVER_URL }/api/image/${ isMeta(meta) ? meta.name : meta }`
  const description = isMeta(meta) && meta.description
  return <Image
    alt={ description || 'no description' }
    style={ { width, height, objectFit: 'contain', borderRadius: '3%' } }
    src={ src }
    { ...props }
  />
}