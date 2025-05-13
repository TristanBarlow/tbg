import React, { useRef, useState, useEffect } from 'react'
import { apiRequest } from '../ts/request'
import { ImageMeta } from '@tbg/types'
import InputField from './InputField'
import Button from './Button'

interface Props {
  meta: ImageMeta | null
  close: () => void
}
export default function ImageUpload ({ meta, close }: Props) {
  const [name, setName] = useState(meta?.name || '')
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState(meta?.description || '')
  const fileElement = useRef<HTMLInputElement | null>(null)

  useEffect(()=>{
    setName(meta?.name || '')
    setDescription(meta?.description || '')
  }, [meta])

  async function submit (): Promise<void> {
    const ele = fileElement.current
    if (!ele || !ele.files) return

    const file = ele.files[0]
    if (!file) return

    setLoading(true)
    await apiRequest(`/api/image/${ name }?descr=${ description }`, 'POST', file)
    setLoading(false)
    close()
  }

  return (
    <div className="modal is-active" style={ { width: '100vw', height: '100vh', position: 'fixed', zIndex: 1000 } }>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-white" style={ { border: 'none' } }>
          <p className="modal-card-title">Uploading Image</p>
          <i className="button material-icons is-danger is-size-6" onClick={ () => close() }>close</i>
        </header>
        <section className="modal-card-body">
          <div>
            <InputField value={ name } label="Choose Name" change={ setName } />
            <InputField value={ description || '' } label="Description" change={ setDescription } />
            <div className="field">
              <p className="label">Choose file</p>
              <input ref={fileElement} className="input" type="file" />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot has-background-white" style={ { border: 'none' } } >
          { <Button loading={ loading } click={ submit } className="button is-primary" >UPLOAD</Button> }
        </ footer>
      </div>
    </div>
  )
}
