import React, { useEffect, useState } from 'react'
import { toKebab } from '@tbg/util'
import { Project } from '../../../packages/types/src/project'
import { useHistory, useParams } from 'react-router'
import MyHelmet from '../components/MyHelmet'
import { useProjects } from '../ts/projects'
import LoadingModal from '../components/LoadingModal'
import { Flex, Link, Text } from '@chakra-ui/react'
import ImageEle from '../components/Image'

interface RouterParams {
  pId: string
}
export default function ProjectView () {
  const { pId } = useParams<RouterParams>()
  const history = useHistory()
  const [projects, loading] = useProjects()
  const [activeProj, setActiveProj] = useState<Project | null>(null)

  useEffect(() => {
    if (loading || !projects.length) {
      return
    }

    const project = projects.find(p => toKebab(p.title) === pId)
    if (!project) {
      history.push('/projects')
      return
    }
    setActiveProj(project)
  }, [loading, projects, pId, history])

  if (!activeProj) {
    return <LoadingModal hideBG />
  }

  return (
    <Flex w="100%" alignItems="center" flexDir="column">
      <MyHelmet title={ `TBG - ${ activeProj.title }` } description={ activeProj.description } />
      <Flex flexDir="column" w="100%" maxW="1200px">
        <p className="title is-3 is-size-5-mobile">{ activeProj.title }</p>
        <Flex flexDirection="column" alignItems="center">
          <Flex mb={ 1 } fontSize="lg" fontWeight="700" alignSelf="flex-start" flexDir="row">
            <Text mr={ 2 }>Github: </Text>
            <Link target="_blank" color="brand.1" href={ activeProj.link }>{ activeProj.link }</Link>
          </Flex>
          <ImageEle width="400px" meta={ activeProj.gifId } />
          <Text my={ 1 }>{ activeProj.description }</Text>
          <ImageEle width="400px" meta={ activeProj.imageId } />
        </Flex>
      </Flex>
    </Flex>
  )
}