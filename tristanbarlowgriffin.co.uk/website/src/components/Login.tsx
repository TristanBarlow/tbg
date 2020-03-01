import React from 'react'
import ModalBase, { ModalBaseProps } from './ModalBase'
import InputField from './InputField'
import Loading from './Loading'
import { Auth } from '../ts/Auth'


interface State {
  key: string
  loading: boolean
}
export default class Login extends ModalBase<{}, State>{
  constructor (p: ModalBaseProps) {
    super(p)
    this.state = { key: '', loading: false }
  }

  getBody (): JSX.Element {
    return <InputField change={ (key) => this.setState({ key }) } label="Manage Key" value={ this.state.key } />
  }

  getTitle (): JSX.Element {
    return <p className="title">Login</p>
  }

  async submit () {
    this.setState({ loading: true })
    if (!await Auth.validate(this.state.key))
      this.setState({ loading: false })
  }

  getFooter (): JSX.Element {
    if (this.state.loading) return <Loading size={ 3 } />

    return (
      <button className="button" onClick={ () => this.submit() }>Submit</button>
    )
  }

}