import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

/* eslint-disable */
type propsWithRouter = RouteComponentProps<{}>
interface State {
  menuActive: boolean
}
export class NavBar extends React.Component<propsWithRouter, State> {
  private static inst: NavBar
  public static push (route: string) {
    NavBar.inst.props.history.push(route)
  }

  constructor (p: propsWithRouter) {
    super(p)
    NavBar.inst = this
    this.state = { menuActive: false }
  }

  navigate (loc: string) {
    this.props.history.push(loc)
    this.setState({ menuActive: false })
  }

  burgerClass () {
    if (this.state.menuActive) return "navbar-burger is-active"
    return "navbar-burger "
  }

  get menu () {
    if (this.state.menuActive) return "navbar-menu is-active"
    return "navbar-menu "
  }

  makeItem (label: string, path: string): JSX.Element {
    return (<a className="navbar-item " onClick={ () => this.navigate(path) }>
      { label }
    </a>)
  }

  render () {
    return (
      <div>
        <nav className="navbar is-primary" role="navigation">
          <div className="navbar-brand">
            <a className="navbar-item" onClick={ () => this.navigate('/') }>
              <p className="title">TBG</p>
            </a>
            <a role="button" className={ this.burgerClass() } onClick={ () => this.setState({ menuActive: !this.state.menuActive }) }>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className={ this.menu }>
            <div className="navbar-start">
              { this.makeItem('Projects', '/projects') }
              { this.makeItem('Chess', '/chess') }
              { this.makeItem('Contact', '/contact') }
            </div>
          </div>
        </nav >
      </div >
    )
  }
}

export default withRouter(NavBar)