import React from 'react'
import { apiRequest } from '../ts/request'
import ModalBase, { ModalBaseProps } from './ModalBase'
import { ImageMeta } from '@tbg/types'
import InputField from './InputField'

interface Props {
  meta: ImageMeta | null
}
interface State extends Omit<ImageMeta, 'viewed'> {
  loading: boolean
}
export default class ImageUpload extends ModalBase<Props, State> {

  fileElement: HTMLInputElement | null = null

  constructor (p: Props & ModalBaseProps) {
    super(p)
    this.state = {
      name: p.meta?.name || '',
      loading: false,
      description: p.meta?.description || '',
    }
  }

  async submit (): Promise<void> {
    if (!this.fileElement || !this.fileElement.files) return

    const file = this.fileElement.files[0]
    if (!file) return

    await apiRequest(`/api/image/${ this.state.name }?descr=${ this.state.description }`, 'POST', file)
    this.close()
  }

  getBody (): JSX.Element | null {
    return (
      <div>
        <InputField value={ this.state.name } label="Choose Name" change={ (x) => this.setState({ name: x }) } />
        <InputField value={ this.state.description || '' } label="Description" change={ (x) => this.setState({ description: x }) } />
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