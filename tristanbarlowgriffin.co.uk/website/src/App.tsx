import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import NavBar from './components/NavBar'
import Background from './components/Background'
import './css/main.css'

function App () {
  return (
    <div >
      { Background({ color: 'hsl(0, 0%, 96%)' }) }
      <BrowserRouter>
        <NavBar />
        <div className="section">
          <Switch>
            <Route path="/contact" component={ Contact } />
            <Route path="/projects" component={ Projects } />
            <Route path="/" component={ Home } />
          </Switch>
        </div>
      </BrowserRouter >
    </div >
  )
}

export default App
