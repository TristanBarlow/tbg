import { MiniMacsNode, WorkerResponse } from './node'

export async function getMove (fen: string) {
  const node = new MiniMacsNode(fen)
  const rating = node.NewLayer(3, true)
  const result: WorkerResponse = {
    move: node.bestMove,
    rating
  }
  return result
}