import { useEffect, useState } from 'react'
import { ImageMeta, Project } from '../../../packages/types/src/project'
import { apiRequest } from './request'


export function useProjects (refresh?: boolean): [Project[], boolean] {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    apiRequest<Project[]>('/api/projects', 'GET')
      .then(x => {
        setLoading(false)
        if (x.status === 200) {
          console.log('Got Projects', x.data)
          setProjects(x.data)
        }
      })
      .catch((e) => {
        console.error(e)
        setLoading(false)
      })

  }, [refresh])

  return [projects, loading]
}

export function useImages (refresh?: boolean): [ImageMeta[], boolean] {
  const [images, setImages] = useState<ImageMeta[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    apiRequest<ImageMeta[]>('/api/images', 'GET')
      .then(x => {
        setLoading(false)
        if (x.status === 200) {
          console.log('Got Projects', x.data)
          setImages(x.data)
        }
      })

  }, [refresh])

  return [images, loading]
}
