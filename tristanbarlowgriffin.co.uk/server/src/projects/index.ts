import { RequestHandler } from 'express'
import { getAll } from './projects'
import { getImage } from './bucket'
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
  const data = req.body
  console.log(typeof data, data)
  res.sendStatus(200)
}