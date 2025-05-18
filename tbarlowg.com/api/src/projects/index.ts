import { RequestHandler } from 'express'
import { getAll, deleteProject } from './projects'
export * from './create'

export const getProjects: RequestHandler = async (req, res) => {
  try {
    const projs = await getAll()
    res.send(projs)
  }
  catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}

export const deleteProjectHandler: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id
    if (typeof id === 'string' && !id)
      throw Error(`Malformed ID ${id}`)
    await deleteProject(id)
    res.sendStatus(200)
  }
  catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}
