import { MoveRequest } from '../types'
import { quickGetMove } from './node'

onmessage = async (e) => {
  const data: MoveRequest = e.data
  const move = quickGetMove(data)
  postMessage(move)
}
