import React, { useState } from 'react'
import InputField from './InputField'
import { Auth } from '../ts/Auth'
import { Spinner } from '@chakra-ui/core'
import { useHistory } from 'react-router'


interface State {
  key: string
  loading: boolean
}
export default function Login () {
  const history = useHistory()
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit () {
    setLoading(true)
    if (!await Auth.validate(key)) {
      setLoading(false)
    }

    history.length ? history.goBack() : history.push('/admin/')
  }

  return (
    <div className="modal is-active" style={ { width: '100vw', height: '100vh', position: 'fixed', zIndex: 1000 } }>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-white" style={ { border: 'none' } }>
          <p className="title">Login</p>
        </header>
        <section className="modal-card-body">
          <InputField change={ setKey } label="Manage Key" value={ key } />
        </section>
        <footer className="modal-card-foot has-background-white" style={ { border: 'none' } } >
          {
            loading ?
              <Spinner size="lg" />
              : <button className="button" onClick={ submit }>Submit</button>
          }
        </footer>
      </div>
    </div >
  )
}