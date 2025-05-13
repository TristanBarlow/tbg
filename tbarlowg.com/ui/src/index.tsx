import React from 'react'
import {createRoot} from 'react-dom/client'
import './css/index.css'
import App from './App'
import { myTheme } from './theme'
import { ChakraProvider } from '@chakra-ui/react'


const root = createRoot(document.getElementById('root')!)

root.render(
    <ChakraProvider value={myTheme}>
        <App />
    </ChakraProvider>
)
