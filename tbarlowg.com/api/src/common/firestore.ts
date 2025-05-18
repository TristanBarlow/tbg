import { Firestore } from '@google-cloud/firestore'
import { serviceAccountPath } from '../env'

let _fs: Firestore | null = null
export const firestore = (): Firestore => _fs ? _fs : _fs = new Firestore({ keyFilename: serviceAccountPath() })
