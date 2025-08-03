export interface MoveResponse {
  move: string | null
  rating: number
  timeTaken: number
  details: string
}

export function timeTaken(strt: number): number {
  return (performance.now() - strt) / 1000
}

export interface MoveRequest {
  fen: string
  maxTime: number
}
