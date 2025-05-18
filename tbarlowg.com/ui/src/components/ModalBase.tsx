import React from 'react'

export interface ModalBaseProps {
  close?: () => void
}
export default abstract class ModalBase<T, S> extends React.Component<T & ModalBaseProps, S> {
  abstract getBody(): React.JSX.Element | null
  abstract getTitle(): React.JSX.Element | null
  abstract getFooter(): React.JSX.Element | null

  private footer(): React.JSX.Element | null {
    if (!this.getFooter()) return null
    return (
      <footer className="modal-card-foot has-background-white" style={{ border: 'none' }}>
        { this.getFooter() }
      </footer>
    )
  }

  protected close() {
    if (this.props.close)
      this.props.close()
  }

  private get closeEle(): React.JSX.Element | null {
    if (typeof this.props.close === 'function')
      return (
        <i className="button material-icons is-danger is-size-6" onClick={() => this.close()}>close</i>
      )

    return null
  }

  render(): React.JSX.Element | null {
    return (
      <div className="modal is-active" style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: 1000 }}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head has-background-white" style={{ border: 'none' }}>
            { this.getTitle() }
            { this.closeEle }
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
