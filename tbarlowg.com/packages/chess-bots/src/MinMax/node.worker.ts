import { makeWebWorker } from '../chessUtils'
import { getMoveMinMax } from './node'

makeWebWorker(getMoveMinMax)
