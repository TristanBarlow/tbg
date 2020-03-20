import { MiniMacsNode, WorkerResponse } from './node'

addEventListener('getMove' as any, async (fen: string) => {
  const node = new MiniMacsNode(fen)
  const rating = node.NewLayer(3, true)
  const result: WorkerResponse = {
    move: node.bestMove,
    rating
  }
  postMessage(result, '')
})