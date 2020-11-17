import React from 'react'
import { ImageMeta, isMeta } from '@tbg/types'

interface Props {
  meta: ImageMeta | string
  loadSize?: number
  width?: string,
  height?: string
}
export default function ImageEle ({ meta, width, height }: Props) {
  const src = `${ process.env.REACT_APP_SERVER_URL }/api/image/${ isMeta(meta) ? meta.name : meta }`
  const description = isMeta(meta) && meta.description
  return <img
    alt={ description || 'no description' }
    style={ { width, height, objectFit: 'contain', borderRadius: '3%' } }
    src={ src }
  />
}