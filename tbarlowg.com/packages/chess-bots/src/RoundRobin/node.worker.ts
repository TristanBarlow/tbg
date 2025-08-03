import { makeWebWorker } from '../chessUtils'
import { quickGetMove } from './node'

makeWebWorker(quickGetMove)
