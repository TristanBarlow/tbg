import Link from 'next/link'
import { useState } from 'react'
import styles from './index.module.css'
export default function Header() {
  const [isActive, setIsActive] = useState(false)

  return (
    <header className={`${styles.navBar} ${styles.shadow1}`}>
      <Link href="/">
        <p className="bold">TBG</p>
      </Link>
      <button 
        className={`hamburger hamburger--squeeze ${isActive && 'is-active'}`}
        onClick={()=> setIsActive(!isActive)} 
        type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <Link href="/projects">Projects</Link>      
    </header>
  )
}
