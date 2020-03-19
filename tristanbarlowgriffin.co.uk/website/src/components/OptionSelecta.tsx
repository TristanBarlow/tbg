import React from 'react'

interface Props<T> {
  value: string
  label?: string
  options: string[] | Record<string, T>
  onChange: (value: T) => void
}
export default class OptionSelecta<T> extends React.Component<Props<T>> {
  get label (): JSX.Element | null {
    if (!this.props.label) return (null)
    return (
      <label className="label" > { this.props.label }</label>
    )
  }

  private get options (): JSX.Element[] {
    if (this.props.options instanceof Array) {
      return this.props.options.map(x => (<option key={ x } value={ x }>{ x }</option>))
    }
    const options: Record<string, T> = this.props.options
    return Object.keys(this.props.options).map(x => <option key={ x } value={ x }>{ options[x] }</option>)
  }

  render () {
    return (
      <div className="field">
        { this.label }
        <div className="select">
          <select value={ this.props.value } onChange={ (x) => this.props.onChange(x.target.value as unknown as T) }>
            { this.options }
          </select>
        </div>
      </div >
    )
  }
}