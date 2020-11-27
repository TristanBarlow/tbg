import { WriteResult } from '@google-cloud/firestore'
import { RequestHandler } from 'express'
import { asyncPipe, getReadStream, createWriteStream, deleteImage } from './bucket'
import { Readable } from 'stream'
import { writeMeta, viewed, deleteImageMeta } from './firestore'
import { getAll } from './firestore'

export async function createImage (id: string, description: string, contentType: string, r: Readable): Promise<WriteResult> {
  console.log('Creating write stream for File: ', id, ' Type: ', contentType)
  if(contentType !== 'image/gif'){
    
  }
  const w = createWriteStream(id, contentType)
  const success = await asyncPipe(w, r)
  if (!success)
    throw Error(`Image Failed to upload to the bucket: ${ id }`)

  console.log('Image written to bucket: ', id, ' Type: ', contentType)
  return writeMeta({ name: id, description, viewed: 0 })
}

export const deleteImageHandler: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id
    console.log('DELETING IMAGE: ', id)
    await Promise.all([deleteImageMeta(id), deleteImage(id)])
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

export const imageUploadHandler: RequestHandler = async (req, res) => {
  try {
    const contentType = req.headers['content-type']
    const id = req.params.id
    const descr = (req.query.descr as string) || ''
    if (typeof contentType !== 'string')
      throw Error('Content type is not defined ' + contentType)
    if (typeof id !== 'string' || id.length < 4)
      throw Error('Id of the image is malformed ' + id)

    await createImage(id, descr, contentType, req)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

export const getAllImageHandler: RequestHandler = async (req, res) => {
  try {
    const images = await getAll()

    res.contentType('application/json')
    return res.send(images)
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

export const getImageHandler: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id
    if (typeof id !== 'string' && id !== '' && id !== 'undefined')
      throw Error('Malformed ID on get Image handler ' + id)

    const r = await getReadStream(id)
    await viewed(id)

    r.pipe(res.status(200))
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}
