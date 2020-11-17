export interface Project {
  title: string
  description: string
  link: string
  imageId: string
  gifId: string
  order: number
}

function isStr (x: string | undefined | null): x is string {
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
