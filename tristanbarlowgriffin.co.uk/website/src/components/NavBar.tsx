import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import Link from './MyLink'

export default function NavBar () {
  const [menuActive, setMenuActive] = useState(false)

  const burgerClass = menuActive ? "navbar-burger is-active " : "navbar-burger "
  const menuClass = menuActive ? "navbar-menu is-active " : "navbar-menu "

  function makeItem (label: string, path: string): JSX.Element {
    return (<Link onClick={ () => setMenuActive(false) } as={ Link } to={ path } className="navbar-item " >
      { label }
    </Link>)
  }

  return (
    <div>
      <nav className="shadow-1 navbar is-primary" role="navigation">
        <div className="navbar-brand">
          <Link _hover={ { textDecoration: '' } } className="navbar-item" to="/">
            <p className="title">TBG</p>
          </Link>
          <a role="button" className={ burgerClass } onClick={ () => setMenuActive(!menuActive) } >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <Box bg="brand.1" id="navbarBasicExample" className={ menuClass }>
          <Box bg="brand.1" className="navbar-start">
            { makeItem('Projects', '/projects') }
            { makeItem('Chess', '/chess') }
            { makeItem('Contact', '/contact') }
          </Box>
        </Box>
      </nav >
    </div >
  )
}