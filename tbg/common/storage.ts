import './config'
import { Storage } from '@google-cloud/storage'

let _s: Storage | null = null
export const storage = (): Storage => _s ? _s : _s = new Storage()
