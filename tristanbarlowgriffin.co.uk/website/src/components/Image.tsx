import React from 'react'
import Loading from './Loading'
import { ImageMeta } from '../@types/project'

interface Props {
  meta: ImageMeta
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

    const url = `/api/image/${ p.meta.name }`
    this.image = new Image()
    this.image.src = url
    this.image.onload = (ev) => {
      this.setState({ loaded: true })
    }
  }

  render () {
    if (this.state.loaded)
      return <img
        alt={ this.props.meta.description || 'no description' }
        style={ { width: this.props.width, height: this.props.height, objectFit: 'contain', borderRadius: '3%' } }
        src={ this.image.src }
      />

    return <div className="center" style={ { width: this.props.width, height: this.props.height } }> <Loading size={ this.props.loadSize || 3 } /></div>
  }
}