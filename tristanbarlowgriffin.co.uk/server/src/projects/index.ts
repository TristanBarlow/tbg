import { RequestHandler } from 'express'
import { getAll } from './projects'
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
