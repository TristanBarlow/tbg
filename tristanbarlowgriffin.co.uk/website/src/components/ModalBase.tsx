import React from 'react'

export interface ModalBaseProps {
  close: () => void
}
export default abstract class ModalBase<T, S> extends React.Component<T & ModalBaseProps, S>{
  abstract getBody (): JSX.Element | null
  abstract getTitle (): JSX.Element | null
  abstract getFooter (): JSX.Element | null

  private footer (): JSX.Element | null {
    if (!this.getFooter()) return null
    return (
      <footer className="modal-card-foot has-background-white" style={ { border: 'none' } } >
        { this.getFooter() }
      </ footer>
    )
  }

  render (): JSX.Element {
    return (
      <div className="modal is-active" style={ { width: '100vw', height: '100vh', position: 'fixed', zIndex: 1000 } }>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head has-background-white" style={ { border: 'none' } }>
            { this.getTitle() }
            <i className="button material-icons is-danger is-size-6" onClick={ () => this.props.close() }>close</i>
          </header>
          <section className="modal-card-body">
            { this.getBody() }
          </section>
          { this.footer() }
        </div>
      </div>
    )
  }
}