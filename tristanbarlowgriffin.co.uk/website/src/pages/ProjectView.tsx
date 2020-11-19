import React, { useEffect, useState } from 'react'
import { toKebab } from '@tbg/util'
import { ProjectLink, Project } from '@tbg/types'
import { useHistory, useParams } from 'react-router'
import MyHelmet from '../components/MyHelmet'
import { useProjects } from '../ts/projects'
import LoadingModal from '../components/LoadingModal'
import { Flex, Grid, Link, Text } from '@chakra-ui/react'
import ImageEle from '../components/Image'

interface RouterParams {
  pId: string
}

function LinkView ({ label, link }: ProjectLink) {
  return <Flex mb={ 1 } fontSize="lg" fontWeight="700" alignSelf="flex-start" flexDir="column">
    <Text mr={ 2 }>{ label }: </Text>
    <Link target="_blank" color="brand.1" href={ link }>{ link }</Link>
  </Flex>
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
        <p className="title is-3">{ activeProj.title }</p>
        <Grid justifyItems="center" justifyContent="center" w="100%" rowGap={ 4 } columnGap={ 2 } templateColumns="repeat(auto-fill, 500px)">
          <Text maxW="600px" my={ 4 }>{ activeProj.description }</Text>
          <ImageEle width="400px" meta={ activeProj.gifId } />
          <ImageEle width="400px" meta={ activeProj.imageId } />
          <Flex flexDir="column" alignItems="flex-start" rowGap={ 4 } templateColumns="auto" w="100%">
            {
              activeProj.links?.map(x => <LinkView { ...x } key={ x.link } />)
            }
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  )
}