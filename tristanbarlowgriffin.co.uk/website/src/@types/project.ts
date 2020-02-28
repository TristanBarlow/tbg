export interface Project {
  title: string
  description: string
  link: string
  imageId: string
  gifId: string
}

function isStr (x: string | undefined): x is string {
  return typeof x === 'string'
}

export function isProject (proj: Partial<Project> | null | undefined): proj is Project {
  return !!proj
    && isStr(proj.description)
    && isStr(proj.gifId)
    && isStr(proj.imageId)
    && isStr(proj.link)
    && isStr(proj.title)
}