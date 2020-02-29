import React from 'react'
import { apiRequest } from '../ts/request'
import ModalBase from './ModalBase'

interface Props {

}
interface State {
  loading: boolean
  name: string
}
export default class ImageUpload extends ModalBase<Props, State> {

  fileElement: HTMLInputElement | null = null
  state: State = { name: '', loading: false }

  async submit (): Promise<void> {
    if (!this.fileElement || !this.fileElement.files) return

    const file = this.fileElement.files[0]
    if (!file) return

    const foo = await apiRequest(`/api/image/${ this.state.name }`, 'POST', 'text', file)
    console.log(foo)
  }

  getBody (): JSX.Element | null {
    return (
      <div>
        <div className="field">
          <p className="label">Choose Name</p>
          <input value={ this.state.name } onChange={ (x) => this.setState({ name: x.target.value }) } className="input" type="text" />
        </div>
        <div className="field">
          <p className="label">Choose file</p>
          <input ref={ (x) => this.fileElement = x } className="input" type="file" />
        </div>
      </div>
    )
  }
  getTitle (): JSX.Element | null {
    return <p className="modal-card-title">Uploading Image</p>
  }

  getFooter (): JSX.Element | null {
    return <button onClick={ () => this.submit() } className="button is-primary" >UPLOAD</button>
  }
}