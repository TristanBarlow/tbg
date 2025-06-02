import { Storage } from '@google-cloud/storage'
import { getCredentials } from '../env'

let _s: Storage | null = null
export const storage = (): Storage => _s ? _s : _s = new Storage(getCredentials())
