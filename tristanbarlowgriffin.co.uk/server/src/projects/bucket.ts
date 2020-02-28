import { storage } from '../common/storage'
import { Readable } from 'stream'


export const bucket = storage().bucket('tbg-assets')

export async function getImage (id: string): Promise<Readable> {
  const [file] = await bucket.file(id).get()
  if (!file.exists())
    throw Error(`File: ${ id } does not exist`)
  return file.createReadStream()
}

export function writeImage (id: string, buff: Buffer): void {
  const w = bucket.file(id).createWriteStream()
  return w.end(buff)
}