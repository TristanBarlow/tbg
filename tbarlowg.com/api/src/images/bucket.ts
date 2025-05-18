import { storage } from '../common/storage'
import { Readable, Writable } from 'stream'

export const rawBucket = storage().bucket('tbg-assets')
export const publicBucket = storage().bucket('tbg-assets-public')

export async function getReadStream(id: string): Promise<Readable> {
  const [file] = await rawBucket.file(id).get()
  if (!file.exists())
    throw Error(`File: ${id} does not exist`)

  return file.createReadStream()
}

export function createWriteStream(id: string, contentType: string): Writable {
  return rawBucket.file(id).createWriteStream({ contentType, resumable: false, metadata: { uploadTime: Date.now() / 1000 } })
}

export async function deleteImage(id: string): Promise<void> {
  await rawBucket.file(id).delete()
}

export function asyncPipe(w: Writable, r: Readable): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    r.on('error', () => resolve(false))
    r.on('end', () => resolve(true))
    r.on('close', () => resolve(true))
    r.pipe(w)
  })
}
