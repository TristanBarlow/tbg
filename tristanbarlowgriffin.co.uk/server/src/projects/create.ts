import { RequestHandler } from 'express'
import { isProject } from 'my-types'
import { writeProject } from './projects'

export const createHandler: RequestHandler = async (req, res) => {
  const data = req.body
  try {
    if (!isProject(data)) {
      throw Error(`Malformed project data: ${ data }`)
    }

    await writeProject(data)
    return res.sendStatus(200)
  } catch (e) {
    console.error(e)
    return res.sendStatus(400)
  }
}
