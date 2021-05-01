import { object, string, array, number, TypeOf } from 'zod'

export const projectLinkSchema = object({
  label: string(),
  link: string()
})

export const projectSchema = object({
  title: string(),
  description: string(),
  links: array(projectLinkSchema),
  imageId: string(),
  gifId: string(),
  order: number()
})

export type Project = TypeOf<typeof projectSchema>; 
export type ProjectLink = TypeOf<typeof projectLinkSchema>;

export const imageMetaSchema = object({
  name: string(),
  viewed: number(),
  description: string().nullable()
})

export type ImageMeta = TypeOf<typeof imageMetaSchema>

