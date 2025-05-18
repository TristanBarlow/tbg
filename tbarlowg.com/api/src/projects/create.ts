import { RequestHandler } from 'express'
import { isProject } from '@tbg/types'
import { writeProject } from './projects'

export const createHandler: RequestHandler = async (req, res) => {
  const data = req.body
  try {
    if (!isProject(data)) {
      throw Error(`Malformed project data: ${data}`)
    }

    await writeProject(data)
    res.sendStatus(200)
  }
  catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
}
