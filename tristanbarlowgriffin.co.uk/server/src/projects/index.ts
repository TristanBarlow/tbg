import { RequestHandler } from 'express'
import { getAll } from './projects'
import { getImage, createWriteStream, asyncPipe } from './bucket'
export * from './create'

export const getProjects: RequestHandler = async (req, res) => {
  try {
    const projs = await getAll()
    res.send(projs)
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

export const getImageHandler: RequestHandler = async (req, res) => {
  try {
    const r = await getImage(req.params.id)
    r.pipe(res.status(200))
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

export const imageUploadHandler: RequestHandler = async (req, res) => {
  try {
    const contentType = req.headers['content-type']
    const name = req.params.id
    if (typeof contentType !== 'string')
      throw Error('Content type is not defined ' + contentType)
    if (typeof name !== 'string' || name.length < 4)
      throw Error('Id of the image is malformed ' + name)

    console.log('Creating write stream for File: ', name, ' Type: ', contentType)
    const w = createWriteStream(name, contentType)
    const success = await asyncPipe(w, req)
    if (!success)
      throw Error(`Image Failed to upload to the bucket: ${ name }`)

    console.log('Image written to bucket: ', name, ' Type: ', contentType)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}