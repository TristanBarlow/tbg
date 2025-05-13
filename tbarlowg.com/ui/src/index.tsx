import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import { myTheme } from './theme'
import { ThemeProvider } from '@emotion/react'


ReactDOM.render(
    <ThemeProvider theme={ myTheme }>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
)
