import { writeProject } from "common/projects"
import { NextApiHandler } from "next"
import { projectSchema } from 'types/project'

const handler: NextApiHandler = async (req, res) => {
  const data = req.body
  try {
    const project = projectSchema.parse(data)
    await writeProject(project)
    res.status(200)
  } catch (e) {
    console.error(e)
    res.status(400)
  }
}

export default handler
