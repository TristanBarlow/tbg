import React, { useEffect } from 'react'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'
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
import ReactGA from 'react-ga'
import { CFG, ENV, Mode } from './env'


export default function App () {
  return (
    <div>
      <Background color='hsl(0, 0%, 96%)' />

    </div>
  )
}

const isProd = CFG.MODE === Mode.prod
if(isProd) {
  ReactGA.initialize('G-0W1Q4MZRW1')
}
function Router() {
  const location = useLocation()
  useEffect(() => {
  if(isProd) return
  ReactGA.pageview(window.location.pathname + window.location.search)
    ReactGA.pageview(location.pathname + location.search)
  }, [location])

return    <BrowserRouter>
        <NavBar />
        <Flex flexDirection="column" alignItems="center">
          <Flex pt={ 2 } px={ 1 } w="100%" maxW="1200px" >
            <Routes>
              <Route path="/contact" element={ <Contact/> } />
              <Route path="/projects/:pId" component={ ProjectView } />
              <Route path="/projects" component={ Projects } />
              <Route path="/chess" component={ ChessPage } />
              <Route path="/admin/login" component={ Login } />
              <Route path="/admin" component={ Manage } />
              <Route path="/" component={ Home } />
            </Routes>
          </Flex>
        </Flex>
      </BrowserRouter >
}
