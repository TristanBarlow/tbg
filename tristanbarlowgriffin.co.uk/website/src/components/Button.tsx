import { ButtonProps, Button as CButton } from '@chakra-ui/core'
import React, { PropsWithChildren } from 'react'
import Loading from './Loading'

export enum Colors {
  PRIMARY = ' is-primary ',
  SUCCESS = ' is-success ',
  INFO = ' is-info ',
  DANGER = ' is-danger '
}

interface Props extends ButtonProps {
  label?: string
  loading?: boolean
  color?: Colors
  click: () => void
}
export default function Button (props: PropsWithChildren<Props>) {
  const clazz = `button ${ props.color }`

  if (props.loading)
    return (
      <Loading size={ 3 } />
    )

  return (
    <CButton onClick={ () => props.click } className={ clazz }{ ...props }>{ props.label }</CButton>
  )
}