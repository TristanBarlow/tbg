import { CollectionReference, DocumentReference } from "@google-cloud/firestore"
import { Project } from "types/project"
import { firestore } from "./firestore"
import { toKebab } from "./util"

export function getProjects(){
  return firestore().collection('projects') as CollectionReference<Project>
}

function getRef (title: string): DocumentReference {
  return getProjects().doc(toKebab(title))
}

export function writeProject (proj: Project) {
  return getRef(proj.title).set(proj, { merge: true })
}

export async function getAllProjects () {
  const projs = await getProjects().get()
  return projs.docs.map(x => x.data())
}

export function deleteProject (id: string) {
  return getProjects().doc(id).delete()
}
