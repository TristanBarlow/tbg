import { RequestHandler } from 'express'
import { getAll } from './projects'
import { getImage, createWriteStream } from './bucket'
import { createReadStream } from 'fs'
import { Readable, Writable } from 'stream'
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

    const w = createWriteStream(name, contentType)
    req.pipe(w)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}