import { useState } from 'react'
import InputField from './InputField'
import { Auth } from '../ts/Auth'
import { Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export default function Login() {
  const navigate = useNavigate()
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit() {
    setLoading(true)
    if (!await Auth.validate(key)) {
      setLoading(false)
    }

    navigate(-1)
  }

  return (
    <div className="modal is-active" style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: 1000 }}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-white" style={{ border: 'none' }}>
          <p className="title">Login</p>
        </header>
        <section className="modal-card-body">
          <InputField change={setKey} label="Manage Key" value={key} />
        </section>
        <footer className="modal-card-foot has-background-white" style={{ border: 'none' }}>
          {
            loading
              ? <Spinner size="lg" />
              : <button className="button" onClick={submit}>Submit</button>
          }
        </footer>
      </div>
    </div>
  )
}
