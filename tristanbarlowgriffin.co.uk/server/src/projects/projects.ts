import { firestore } from '../common/firestore'
import { Project, isProject } from '@tbg/types'
import { WriteResult, DocumentReference } from '@google-cloud/firestore'
import { toKebab, toTitle } from '@tbg/util'

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

function getRef (title: string): DocumentReference {
  return projects.doc(toKebab(title))
}

export function writeProject (proj: Project): Promise<WriteResult> {
  return getRef(proj.title).set(proj, { merge: true })
}

export async function getAll (): Promise<Project[]> {
  const projs = await projects.get()
  return projs.docs.map(x => x.data())
}

export function deleteProject (id: string): Promise<WriteResult> {
  return projects.doc(id).delete()
}