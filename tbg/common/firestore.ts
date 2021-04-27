import './config'
import { Firestore } from '@google-cloud/firestore'

let _fs: Firestore | null = null
export const firestore = (): Firestore => _fs ? _fs : _fs = new Firestore()
