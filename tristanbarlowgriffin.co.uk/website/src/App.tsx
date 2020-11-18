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
import ChessPage from './pages/Chess'
import Login from './components/Login'
import { Flex } from '@chakra-ui/react'

export default function App () {
  return (
    <div>
      { Background({ color: 'hsl(0, 0%, 96%)' }) }
      <BrowserRouter>
        <NavBar />
        <Flex flexDirection="column" alignItems="center">
          <Flex pt={ 2 } px={ 1 } w="100%" maxW="1200px" >
            <Switch>
              <Route path="/contact" component={ Contact } />
              <Route path="/projects/:pId" component={ ProjectView } />
              <Route path="/projects" component={ Projects } />
              <Route path="/chess" component={ ChessPage } />
              <Route path="/admin/login" component={ Login } />
              <Route path="/admin" component={ Manage } />
              <Route path="/" component={ Home } />
            </Switch>
          </Flex>
        </Flex>
      </BrowserRouter >
    </div>
  )
}
