import { isString } from 'lodash'

export interface Project {
  title: string
  description: string
  links: ProjectLink[]
  imageURI: string
  gifURI: string
}

export interface ProjectLink {
  label: string
  link: string
}

export function isProject(proj: Partial<Project> | null | undefined): proj is Project {
  return !!proj
    && isString(proj.description)
    && isString(proj.gifURI)
    && isString(proj.imageURI)
    && proj.links instanceof Array
    && isString(proj.title)
}
