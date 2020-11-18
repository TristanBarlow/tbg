import React, { useState } from 'react'
import { useHistory } from 'react-router'

/* eslint-disable */
export default function NavBar () {
  const history = useHistory()
  const [menuActive, setMenuActive] = useState(false)
  function navigate (loc: string) {
    history.push(loc)
    setMenuActive(false)
  }


  const burgerClass = menuActive ? "navbar-burger is-active " : "navbar-burger "
  const menuClass = menuActive ? "navbar-menu is-active " : "navbar-menu "

  function makeItem (label: string, path: string): JSX.Element {
    return (<a className="navbar-item " onClick={ () => navigate(path) }>
      { label }
    </a>)
  }

  return (
    <div>
      <nav className="shadow-1 navbar is-primary" role="navigation">
        <div className="navbar-brand">
          <a className="navbar-item" onClick={ () => navigate('/') }>
            <p className="title">TBG</p>
          </a>
          <a role="button" className={ burgerClass } onClick={ () => setMenuActive(!menuActive) } >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={ menuClass }>
          <div className="navbar-start">
            { makeItem('Projects', '/projects') }
            { makeItem('Chess', '/chess') }
            { makeItem('Contact', '/contact') }
          </div>
        </div>
      </nav >
    </div >
  )
}