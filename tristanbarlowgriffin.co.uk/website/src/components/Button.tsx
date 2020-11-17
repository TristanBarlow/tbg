import React from 'react'
import Loading from './Loading'

export enum Colors {
  PRIMARY = ' is-primary ',
  SUCCESS = ' is-success ',
  INFO = ' is-info ',
  DANGER = ' is-danger '
}

export enum Size {
  SMALL = ' is-small ',
  NORMAL = ' is-normal ',
  MEDIUM = '  is-medium ',
  LARGE = '  is-large '
}

interface Props {
  label: string
  loading?: boolean
  color?: Colors
  size?: Size
  onClick: () => void
}
export default class Button extends React.Component<Props>{
  get clazz () {
    return `button ${ this.props.color } ${ this.props.size || '' }`
  }

  render () {
    if (this.props.loading)
      return (
        <Loading size={ 3 } />
      )

    return (
      <button onClick={ () => this.props.onClick() } className={ this.clazz } >{ this.props.label }</button>
    )
  }
}