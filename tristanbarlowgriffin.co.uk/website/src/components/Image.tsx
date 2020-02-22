import React from 'react'
import Loading from './Loading'

interface Props {
  url: string
  loadSize?: number
}
interface State {
  loaded: boolean
}
export default class ImageEle extends React.Component<Props, State>{
  state = { loaded: false }
  image: HTMLImageElement
  constructor (p: Props) {
    super(p)

    this.image = new Image()
    this.image.src = p.url
    this.image.onload = (ev) => {
      this.setState({ loaded: true })
    }
  }

  render () {
    if (this.state.loaded)
      return <img alt={ this.props.url } style={ { objectFit: 'contain', borderRadius: '3%' } } src={ this.props.url } />

    return <Loading size={ this.props.loadSize || 3 } />
  }
}