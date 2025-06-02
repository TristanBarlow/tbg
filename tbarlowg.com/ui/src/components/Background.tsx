interface Props {
  color: string
}

export default function Background(c: Props) {
  return (
    <div style={{ overflow: '0', backgroundColor: c.color, width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: -1 }} />
  )
}
