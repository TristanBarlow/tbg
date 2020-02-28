import React from 'react'
import { apiRequest } from '../ts/request'

interface Props {

}
interface State {
  loading: boolean
}
export default class ImageUpload extends React.Component<Props, State>{
  fileElement: HTMLInputElement | null = null

  async submit (): Promise<void> {
    if (!this.fileElement || !this.fileElement.files) return

    const file = this.fileElement.files[0]
    if (!file) return

    const foo = await apiRequest('/api/image', 'POST', 'text', file)
    console.log(foo)
  }

  render (): JSX.Element {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Uploading Image</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <p className="label">Choose file</p>
              <input ref={ (x) => this.fileElement = x } className="input" type="file"></input>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button onClick={ () => this.submit() } className="button is-primary" >UPLOAD</button>
          </footer>
        </div>
      </div>
    )
  }
}