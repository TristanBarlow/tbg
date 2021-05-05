import { useIsMobile } from 'common/responsive'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import styles from './index.module.css'

export default function Header() {
  const [isActive, setIsActive] = useState(false)
  const isMobile = useIsMobile()


  const close = useCallback(()=> setIsActive(false), [])

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
  
  const menuEle =  <menu className={styles.myMenu}>
    <Link href="/projects">Projects</Link>      
    <Link href="/chess">Chess</Link>      
    <Link href="/contact">Contact</Link>      
  </menu>

  const asideClass = isActive && styles.navBarAsideActive
  const aside = isMobile && <aside onClick={close} className={`${styles.navBarAside} ${asideClass}`}>
    {isMobile && menuEle}
  </aside>

  return (
    <>
      <header className={`${styles.navBar} shadow1`}>
        <Link href="/">
          <a className={`bold pointer ${styles.tbg}`}>TBG</a>
        </Link>
        {!isMobile && menuEle}
        {burger}
      </header>
      {aside}
    </>
  )
}
