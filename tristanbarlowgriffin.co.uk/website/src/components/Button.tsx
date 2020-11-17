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
export default function Button (props: Props) {
  const clazz = `button ${ props.color } ${ props.size || '' }`

  if (props.loading)
    return (
      <Loading size={ 3 } />
    )

  return (
    <button onClick={ () => props.onClick() } className={ clazz } >{ props.label }</button>
  )
}