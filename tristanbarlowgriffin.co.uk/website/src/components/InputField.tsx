import React from 'react'

interface Props {
  value: string
  change: (str: string) => void
  label: string
  clazz?: string
  type?: string
}
export default class InputField extends React.Component<Props>{
  render () {
    return (
      <div className="field">
        <p className="label">{ this.props.label }</p>
        <input
          value={ this.props.value }
          onChange={ (x) => this.props.change(x.target.value) }
          className={ this.props.clazz || 'input' }
          type={ this.props.type || 'text' } />
      </div>
    )
  }
}