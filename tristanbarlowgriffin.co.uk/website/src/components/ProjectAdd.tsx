import React from 'react'
import { apiRequest } from '../ts/request'
import ModalBase, { ModalBaseProps } from './ModalBase'
import { Project } from 'my-types'
import InputField from './InputField'

interface Props {
  proj: Project | null
}
interface State extends Project {
  loading: boolean
}

export default class ProjectAdd extends ModalBase<Props, State> {

  fileElement: HTMLInputElement | null = null


  constructor (p: Props & ModalBaseProps) {
    super(p)
    this.state = { title: '', description: '', gifId: '', loading: false, imageId: '', link: '', order: 100 }
    if (p.proj) this.state = { ...this.state, ...p.proj }
  }

  async submit (): Promise<void> {
    await apiRequest(`/api/projects/create`, 'POST', this.state)
    this.close()
  }

  getBody (): JSX.Element | null {
    return (
      <div>
        <InputField label="Title" value={ this.state.title } change={ (x) => this.setState({ title: x }) } />
        <div className="field">
          <p className="label">Description</p>
          <textarea
            value={ this.state.description }
            onChange={ (x) => this.setState({ description: x.target.value }) }
            className="textarea" />
        </div>
        <InputField label="Link" value={ this.state.link } change={ (x) => this.setState({ link: x }) } />
        <InputField label="Image ID" value={ this.state.imageId } change={ (x) => this.setState({ imageId: x }) } />
        <InputField label="Gif ID" value={ this.state.gifId } change={ (x) => this.setState({ gifId: x }) } />
        <InputField label="Order" type="number" value={ this.state.order.toString() } change={ (x) => this.setState({ order: parseInt(x) }) } />
      </div>
    )
  }

  getTitle (): JSX.Element | null {
    return <p className="modal-card-title">Making Project</p>
  }

  getFooter (): JSX.Element | null {
    return <button onClick={ () => this.submit() } className="button is-primary" >SUBMIT</button>
  }
}