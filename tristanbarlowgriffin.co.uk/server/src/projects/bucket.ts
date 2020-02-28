import { storage } from '../common/storage'


export const bucket = storage().bucket('tbg-assets')

export async function getImage (id: string) {
  const [file] = await bucket.file(id).get()
  if (!file.exists())
    throw Error(`File: ${ id } does not exist`)
  return file.createReadStream()
}

export function writeImage (id: string, buff: Buffer) {
  const w = bucket.file(id).createWriteStream()
  return w.write(buff)
}