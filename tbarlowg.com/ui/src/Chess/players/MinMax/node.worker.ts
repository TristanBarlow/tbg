import { quickGetMove } from './node'

onmessage = async (e) => {
  const move = quickGetMove(e.data)
  postMessage(move)
}
