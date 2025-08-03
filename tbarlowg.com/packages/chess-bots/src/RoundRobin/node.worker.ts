import { makeWebWorker } from '../chessUtils'
import { getMoveRoundRobin } from './node'

makeWebWorker(getMoveRoundRobin)
