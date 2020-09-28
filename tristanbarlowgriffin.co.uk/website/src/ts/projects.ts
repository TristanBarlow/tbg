import { useEffect, useState } from 'react'
import { Project } from '../@types/project'
import { apiRequest } from './request'


export function useProjects (): [Project[], boolean] {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    apiRequest<Project[]>('/api/projects', 'GET')
      .then(x => {
        setLoading(false)
        if (x.data) {
          setProjects(x.data)
        }

      })

  })

  return [projects, loading]
}