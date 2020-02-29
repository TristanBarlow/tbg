import React from 'react'
import ImageUpload from '../components/ImageUpload'
import { ImageMeta } from '../@types/project'
import { apiRequest } from '../ts/request'

interface State {
  showImageUpload: boolean
  images: ImageMeta[]
}
export default class ProjectManager extends React.Component<{}, State>{
  state: State = { showImageUpload: false, images: [] }

  constructor (p: {}) {
    super(p)
    this.loadImages()
  }

  async loadImages () {
    const response = await apiRequest<ImageMeta[]>('/api/images', 'GET', 'json')
    if (response.status === 200 && response.data)
      this.setState({ images: response.data })
  }

  render (): JSX.Element {
    return (
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical">
          <div className="title">Projects</div>
          <button style={ { width: 'fit-content' } } className="button is-primary">Upload New Project</button>
          <div className="tile is-parent">
            <div className="tile is-child">
            </div>
          </div>
        </div>
      </div >
    )
  }
}