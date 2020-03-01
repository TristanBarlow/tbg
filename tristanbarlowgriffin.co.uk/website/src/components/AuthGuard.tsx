import React from 'react'
import Login from './Login'
import { Auth } from '../ts/Auth'

interface State {
  isAuthed: boolean
}
export default class AuthGuard extends React.Component<{}, State>{

  public static UpdateAuth (key: string, isAuthed: boolean) {
  }
  constructor (p: {}) {
    super(p)
    this.state = { isAuthed: false }
    Auth.registerListner('Guard', (isAuthed) => this.setState({ isAuthed }))
  }

  render () {
    if (!this.state.isAuthed) {
      return <Login />
    }

    return <div> { this.props.children }</div>
  }
}