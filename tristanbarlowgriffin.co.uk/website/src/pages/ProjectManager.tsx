import React from 'react'
import ImageUpload from '../components/ImageUpload'

interface State {

}
export default class ProjectManager extends React.Component<{}, State>{

  render (): JSX.Element {
    return (
      <div>
        <ImageUpload />
      </div>
    )
  }
}