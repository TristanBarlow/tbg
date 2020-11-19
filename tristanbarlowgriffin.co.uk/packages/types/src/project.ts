export interface Project {
  title: string
  description: string
  links: ProjectLink[]
  imageId: string
  gifId: string
  order: number
}

export interface ProjectLink {
  label: string
  link: string
}

function isStr (x: string | undefined | null): x is string {
  return typeof x === 'string'
}

export function isProject (proj: Partial<Project> | null | undefined): proj is Project {
  return !!proj
    && isStr(proj.description)
    && isStr(proj.gifId)
    && isStr(proj.imageId)
    && proj.links instanceof Array
    && isStr(proj.title)
}

export interface ImageMeta {
  name: string
  viewed: number
  description: string | null
}

export function isMeta (meta: Partial<ImageMeta> | null | undefined | any): meta is ImageMeta {
  return !!meta
    && isStr(meta.name)
    && (meta.description === null || isStr(meta.description))
    && typeof meta.viewed === 'number'
}
