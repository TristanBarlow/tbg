import React from 'react'
import Loading from './Loading'
import { ImageMeta } from 'my-types'

interface Props {
  meta: ImageMeta | string
  loadSize?: number
  width?: string,
  height?: string
}
interface State {
  loaded: boolean
}
export default class ImageEle extends React.Component<Props, State>{
  state = { loaded: false }
  image: HTMLImageElement
  url: string = ''
  constructor (p: Props) {
    super(p)

    this.image = new Image()
    if (typeof p.meta !== 'string') {
      const url = `/api/image/${ p.meta.name }`
      this.image.src = url
    } else {
      this.image.src = p.meta
    }

    this.image.onload = (ev) => {
      this.setState({ loaded: true })
    }
  }

  get description (): string {
    return typeof this.props.meta === 'string' ? 'no description' : this.props.meta.description || 'no description'
  }

  render () {
    if (this.state.loaded)
      return <img
        alt={ this.description }
        style={ { width: this.props.width, height: this.props.height, objectFit: 'contain', borderRadius: '3%' } }
        src={ this.image.src }
      />

    return <div className="center" style={ { width: this.props.width, height: this.props.height } }> <Loading size={ this.props.loadSize || 3 } /></div>
  }
}