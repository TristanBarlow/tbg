import { RequestHandler } from 'express'
import { getAll } from './projects'
import { getImage } from './bucket'
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
    const w = await getImage(req.params.id)
    w.pipe(res.status(200))
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}