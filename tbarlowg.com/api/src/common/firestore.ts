import { Firestore } from '@google-cloud/firestore'
import { getCredentials } from '../env'

let _fs: Firestore | null = null
export const firestore = (): Firestore => _fs ? _fs : _fs = new Firestore(getCredentials())
