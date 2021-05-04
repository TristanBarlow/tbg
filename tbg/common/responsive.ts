import { useEffect, useState } from "react"

export function useIsMobile() {
  const size = useWindowSize()
  if(!size) return false
  return size.width <= 500
}

interface Size {
  width: number
  height: number
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<Size | null>(null)
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return windowSize
}
