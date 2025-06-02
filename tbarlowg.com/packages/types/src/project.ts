import { isString } from 'lodash'

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

export function isProject(proj: Partial<Project> | null | undefined): proj is Project {
  return !!proj
    && isString(proj.description)
    && isString(proj.gifId)
    && isString(proj.imageId)
    && proj.links instanceof Array
    && isString(proj.title)
}

export interface ImageMeta {
  name: string
  viewed: number
  description: string | null
}

export function isMeta(meta: Partial<ImageMeta> | null | undefined | string): meta is ImageMeta {
  if (isString(meta)) return false
  return !!meta
    && isString(meta.name)
    && (meta.description === null || isString(meta.description))
    && typeof meta.viewed === 'number'
}
