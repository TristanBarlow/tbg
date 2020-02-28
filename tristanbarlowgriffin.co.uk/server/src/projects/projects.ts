import { firestore } from '../common/firestore'
import { Project, isProject } from '../@types/project'
import { WriteResult } from '@google-cloud/firestore'
import { toKebab, toTitle } from '../shared/util'

const projects = firestore()
  .collection('projects')
  .withConverter<Project>({
    fromFirestore: (data) => {
      if (!isProject(data))
        throw Error(`Project Data from firestore is not of type project: ${ JSON.stringify(data) }`)

      data.title = toTitle(data.title)
      return data
    },
    toFirestore: (model) => {
      model.title = toKebab(model.title)
      return model
    }
  })

export function writeProject (proj: Project): Promise<WriteResult> {
  return projects.doc().set(proj, { merge: true })
}

export async function getAll (): Promise<Project[]> {
  const projs = await projects.get()
  return projs.docs.map(x => x.data())
}