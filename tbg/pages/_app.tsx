import Header from 'components/Header'
import 'styles/hamburger.css'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <div>
    <Header />
    <Component {...pageProps} />
  </div>
}

export default MyApp
