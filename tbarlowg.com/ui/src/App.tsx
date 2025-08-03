import { useEffect } from 'react'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import NavBar from './components/NavBar'
import Background from './components/Background'
import ProjectView from './pages/ProjectView'
import './css/main.css'
import Login from './components/Login'
import { Flex } from '@chakra-ui/react'
import ReactGA from 'react-ga'
import { CFG, Mode } from './env'
import { ChessPage } from './Chess/ChessPage'
import { Toaster } from './components/toaster'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Background color="hsl(0, 0%, 96%)" />
        <Router />
      </BrowserRouter>
    </div>
  )
}

const isProd = CFG.MODE === Mode.prod
if (isProd) {
  ReactGA.initialize('G-0W1Q4MZRW1')
}
function Router() {
  const location = useLocation()
  useEffect(() => {
    if (isProd) return
    ReactGA.pageview(window.location.pathname + window.location.search)
    ReactGA.pageview(location.pathname + location.search)
  }, [location])

  return (
    <>
      <NavBar />
      <Toaster />
      <Flex flexDirection="column" alignItems="center">
        <Flex pt={2} px={1} w="100%" maxW="1200px">
          <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/:pId" element={<ProjectView />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/chess" element={<ChessPage />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  )
}
