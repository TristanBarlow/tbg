/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useEffect } from 'react'
import ImageManager from '../components/ImageManager'
import ProjectManager from '../components/ProjectManager'
import { Route, Routes, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Auth } from '../ts/Auth'
import { Flex } from '@chakra-ui/react'

export default function Manage () {
  const navigate = useNavigate()
  useEffect(() => {
    if (!Auth.key) {
      navigate('/admin/login')
    }
  }, [navigate])

  return (
    <Flex flexDirection="column" w="100%">
      <div className="tabs">
        <ul>
          <Link to="/admin/images">Images</Link>
          <Link to="/admin/projects">Projects</Link>
        </ul>
      </div>
      <Routes>
        <Route path="/admin/images">
        <ImageManager />
        </Route>
        <Route>
          <ProjectManager />
        </Route>
      </Routes>
    </Flex>
  )
}
