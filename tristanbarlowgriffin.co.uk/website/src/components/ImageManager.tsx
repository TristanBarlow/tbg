import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import { ImageMeta } from '../../../packages/types/src/project'
import { apiRequest } from '../ts/request'
import ImageEle from './Image'
import { useImages } from '../ts/projects'

export default function ImageManager () {
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [activeImage, setActiveImage] = useState<ImageMeta | null>(null)
  const [images] = useImages(refresh)

  async function deleteImage (id: string) {
    await apiRequest('/api/image/' + id, 'DELETE')
    setRefresh(!refresh)
  }

  function showUpload (img: ImageMeta | null) {
    setShowImageUpload(true)
    setActiveImage(img)
    setRefresh(!refresh)
  }

  function closeUpload () {
    setShowImageUpload(false)
    setActiveImage(null)
    setRefresh(!refresh)
  }

  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent is-vertical">
        <div className="title">Images</div>
        <div className="tile is-child">
          <button
            onClick={ () => setShowImageUpload(true) }
            style={ { width: 'fit-content' } }
            className="button is-primary">
            Upload New Image
          </button>
        </div>
        <div className="tile">
          {
            images.map(x => (
              <div key={ x.name } className="tile is-parent is-3">
                <div className="tile is-child box col">
                  <p className="subtitle is-4">Name: { x.name }</p>
                  <p className="subtitle is-4">Views: { x.viewed }</p>
                  <p className="subtitle is-5">Description: { x.description }</p>
                  <ImageEle height='200px' meta={ x } />
                  <div className="center" style={ { marginTop: '10px' } }>
                    <button onClick={ () => showUpload(x) } className="button is-link"> Update</button>
                    <button onClick={ () => deleteImage(x.name) } className="button is-danger"> Delete</button>

                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      { showImageUpload && <ImageUpload meta={ activeImage } close={ closeUpload } /> }
    </div >
  )
}