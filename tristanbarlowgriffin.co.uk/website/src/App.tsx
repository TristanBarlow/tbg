import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import NavBar from './components/NavBar'
import Background from './components/Background'
import ProjectView from './pages/ProjectView'
import Manage from './pages/Manage'
import './css/main.css'
import Chess from './pages/Chess'
import Auth from './components/AuthGuard'

export class App extends React.Component<{}> {

  render() {
    return (
      <div>
        {Background({ color: 'hsl(0, 0%, 96%)' })}
        < BrowserRouter >
          <NavBar />
          <div className="section">
            <Switch>
              <Route path="/contact" component={Contact} />
              <Route path="/projects/*" component={ProjectView} />
              <Route path="/projects" component={Projects} />
              <Route path="/chess" component={Chess} />
              <Route path="/manage*" >
                <Auth>
                  <Manage />
                </Auth>
              </Route>
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </BrowserRouter >
      </div>
    )
  }
}

export default App
