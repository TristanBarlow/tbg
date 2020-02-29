import React from 'react'
import ImageUpload from '../components/ImageUpload'
import { ImageMeta } from '../@types/project'
import { apiRequest } from '../ts/request'
import Loading from './Loading'
import ImageEle from './Image'

interface State {
  showImageUpload: boolean
  images: ImageMeta[]
  loading: boolean
  activeImage: ImageMeta | null
}
export default class ImageManager extends React.Component<{}, State>{
  state: State = { showImageUpload: false, images: [], loading: true, activeImage: null }

  constructor (p: {}) {
    super(p)
    this.loadImages()
  }

  async loadImages () {
    this.setState({ loading: true })
    const response = await apiRequest<ImageMeta[]>('/api/images', 'GET', 'json')
    if (response.status === 200 && response.data)
      this.setState({ images: response.data })
    this.setState({ loading: false })
  }

  get imageElements (): JSX.Element {
    if (this.state.loading)
      return <Loading size={ 10 } />
    return (
      <div className="tile">
        { this.state.images.map(x => (
          <div key={ x.name } className="tile is-parent is-3">
            <div className="tile is-child box col">
              <p className="subtitle is-4">Name: { x.name }</p>
              <p className="subtitle is-4">Views: { x.viewed }</p>
              <p className="subtitle is-5">Description: { x.description }</p>
              <ImageEle height='200px' meta={ x } />
              <div className="center" style={ { marginTop: '10px' } }>
                <button onClick={ () => this.setState({ showImageUpload: true, activeImage: x }) } className="button is-link"> Update</button>
              </div>

            </div>
          </div>
        )) }
      </div>
    )
  }

  closeUpload () {
    this.loadImages()
    this.setState({ showImageUpload: false, activeImage: null })
  }

  get imageUpload (): JSX.Element | null {
    if (!this.state.showImageUpload) return null
    return <ImageUpload meta={ this.state.activeImage } close={ () => this.closeUpload() } />
  }

  render (): JSX.Element {
    return (
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical">
          <div className="title">Images</div>
          <div className="tile is-child">
            <button
              onClick={ () => this.setState({ showImageUpload: true }) }
              style={ { width: 'fit-content' } }
              className="button is-primary">
              Upload New Image
          </button>
          </div>
          { this.imageElements }
        </div>
        { this.imageUpload }
      </div >
    )
  }
}