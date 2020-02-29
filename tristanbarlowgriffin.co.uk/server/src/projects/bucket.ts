import { storage } from '../common/storage'
import { Readable, Writable } from 'stream'


export const bucket = storage().bucket('tbg-assets')

export async function getImage (id: string): Promise<Readable> {
  const [file] = await bucket.file(id).get()
  if (!file.exists())
    throw Error(`File: ${ id } does not exist`)
  return file.createReadStream()
}

export function createWriteStream (id: string, contentType: string): Writable {
  return bucket.file(id).createWriteStream({ contentType, resumable: false, metadata: { uploadTime: Date.now() / 1000 } })
}

export function asyncPipe (w: Writable, r: Readable): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    r.on('error', () => resolve(false))
    r.on('close', () => resolve(true))
    r.on('end', () => resolve(true))
    r.pipe(w)
  })
} 