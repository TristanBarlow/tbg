import React, { useRef } from 'react'

export interface Log {
  id: string
  time: number
  color: string
  botName: string
  details: string
}

interface Props {
  logs: Log[]
}
export default function ChessLog ({ logs }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null)
  // useEffect(() => {
  //   if (!endRef.current) return
  //   endRef.current.scrollIntoView({ behavior: 'smooth' })
  // }, [logs])
  return (
    <div>
      {
        logs.map(log => (
          <div key={ log.id }>
            <div>
              <p >{ log.color }</p>
              <p>{ log.botName }:</p>
            </div>
            <div >{ log.details }</div>
          </div>
        ))
      }
      <div ref={ r => endRef.current = r } />
    </div >
  )
}
