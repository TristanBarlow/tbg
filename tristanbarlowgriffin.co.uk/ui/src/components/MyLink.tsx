import React from 'react'
import { Link as CLink, LinkProps } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface Props extends LinkProps {
  to?: string
  label?: string
}
export default function MyLink (props: Props) {
  return (
    <CLink as={ Link } { ...props }>{ props.children }</CLink>
  )
}