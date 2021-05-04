import Header from 'components/header'
import 'styles/hamburger.css'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <div>
    <Header />
    <Component {...pageProps} />
  </div>
}

export default MyApp
