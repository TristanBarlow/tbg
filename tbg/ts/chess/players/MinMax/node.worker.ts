import { quickGetMove } from './node'

export async function getMove (fen: string) {
  return quickGetMove(fen)
}