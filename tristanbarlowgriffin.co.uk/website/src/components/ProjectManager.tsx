import React, { useState } from 'react'
import ProjectAdd from './ProjectAdd'
import { Project } from '../../../packages/types/src/project'
import { apiRequest } from '../ts/request'
import { toKebab } from '@tbg/util'
import { useProjects } from '../ts/projects'
import LoadingModal from './LoadingModal'
import { Flex, Grid, Link, Text } from '@chakra-ui/core'
import Button from './Button'

interface State {
  showProjectAdd: boolean
  projects: Project[]
  activeProject: Project | null
}
export default function ProjectManager () {
  const [refresh, setRefresh] = useState(false)
  const [projects, loading] = useProjects(refresh)
  const [projectAdd, setProjectAdd] = useState(false)
  const [activeProject, setActiveProj] = useState<Project | null>(null)

  function close () {
    setProjectAdd(false)
    setActiveProj(null)
    setRefresh(!refresh)
  }

  async function deleteProj (x: Project) {
    await apiRequest('/api/projects/' + toKebab(x.title), 'DELETE')
    setRefresh(!refresh)
  }

  const showProjectAdd = (proj: Project | null) => {
    setProjectAdd(true)
    setActiveProj(proj)
  }

  if (loading) {
    return <LoadingModal hideBG />
  }

  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent is-vertical">
        <div className="title">Projects</div>
        <button
          onClick={ () => setProjectAdd(true) }
          style={ { width: 'fit-content' } }
          className="button is-primary">
          Upload New Project
          </button>
        <div className="tile">
          {
            projects.map(x =>
              <Flex className="shadow-1" padding={ 2 } bg="white" flexDirection="column" w="350px" key={ x.title }>
                <Grid rowGap={ 2 } overflowX="hidden" columnGap={ 2 } templateColumns="100px auto">
                  <Text fontWeight="600">Title: </Text>
                  <Text> { x.title }</Text>
                  <Text fontWeight="600">link: </Text>
                  <Link as="a" src={ x.link }> { x.link }</Link>
                  <Text fontWeight="600">GIF: </Text>
                  <Text> { x.gifId }</Text>
                  <Text fontWeight="600">Image: </Text>
                  <Text> { x.imageId }</Text>
                </Grid>
                <Flex mt={ 2 } w="100%" justifyContent="space-around" className="field is-grouped">
                  <Button click={ () => showProjectAdd(x) } className="button is-link"> Update</Button>
                  <Button click={ () => deleteProj(x) } className="button is-danger"> Delete</Button>
                </Flex>
              </Flex>
            ) }
        </div>
      </div>
      { projectAdd && <ProjectAdd proj={ activeProject } close={ close } /> }
    </div >
  )
}