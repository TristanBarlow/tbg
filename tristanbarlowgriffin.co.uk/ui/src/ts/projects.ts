import { useEffect, useState } from 'react'
import { ImageMeta, Project } from '@tbg/types/src/project'
import { apiRequest } from './request'


export function useProjects (refresh?: boolean): [Project[], boolean] {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    apiRequest<Project[]>('/api/projects', 'GET')
      .then(x => {
        setLoading(false)
        if (x.success) {
          console.log('Got Projects', x.data)
          setProjects(x.data.sort((a, b)=> a.order - b.order))
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
        if (x.success) {
          console.log('Got Projects', x.data)
          setImages(x.data)
        }
      })

  }, [refresh])

  return [images, loading]
}
