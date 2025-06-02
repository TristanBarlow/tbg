import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App'
import { myTheme } from './theme'
import { ChakraProvider } from '@chakra-ui/react'

const rootEle = document.getElementById('root')
if (rootEle) {
  const root = createRoot(rootEle)

  root.render(
    <ChakraProvider value={myTheme}>
      <App />
    </ChakraProvider>,
  )
}
