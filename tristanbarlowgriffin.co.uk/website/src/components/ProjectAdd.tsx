import React from 'react'
import { apiRequest } from '../ts/request'
import ModalBase from './ModalBase'
import { Project } from '../@types/project'

interface Props {

}
interface State extends Project {
  loading: boolean
}
export default class ProjectAdd extends ModalBase<Props, State> {

  fileElement: HTMLInputElement | null = null
  state: State = { title: '', description: '', gifId: '', loading: false, imageId: '', link: '' }

  async submit (): Promise<void> {
    const foo = await apiRequest(`/api/project/${ this.state.title }`, 'POST', 'text', this.state)
    console.log(foo)
  }

  getBody (): JSX.Element | null {
    return (
      <div>
        <div className="field">
          <p className="label">Title</p>
          <input value={ this.state.title } onChange={ (x) => this.setState({ title: x.target.value }) } className="input" type="text" />
        </div>
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