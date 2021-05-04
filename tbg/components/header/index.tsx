import { useIsMobile } from 'common/responsive'
import Link from 'next/link'
import { useState } from 'react'
import styles from './index.module.css'

export default function Header() {
  const [isActive, setIsActive] = useState(false)
  const isMobile = useIsMobile()

  const burger = isMobile && (
    <button 
      className={`hamburger hamburger--squeeze ${styles.menuIcon} ${isActive && 'is-active'}`}
      onClick={()=> setIsActive(!isActive)} 
      type="button">
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  ) 
        
  const menuClass = isMobile && styles.menuActive
  return (
    <header className={`${styles.navBar} shadow1`}>
      <Link href="/">
        <a className={`bold pointer ${styles.tbg}`}>TBG</a>
      </Link>
      {burger}
      <menu>
        <Link href="/projects">Projects</Link>      
        <Link href="/chess">Chess</Link>      
        <Link href="/contact">Contact</Link>      
      </menu>
    </header>
  )
}
