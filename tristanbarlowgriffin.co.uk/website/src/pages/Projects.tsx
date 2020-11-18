import React from 'react'
import { Project } from '../../../packages/types/src/project'
import { toKebab } from '@tbg/util'
import { useProjects } from '../ts/projects'
import { Flex, Grid, Text } from '@chakra-ui/react'
import ImageEle from '../components/Image'
import MyHelmet from '../components/MyHelmet'
import MyLink from '../components/MyLink'

function ProjectTile ({ imageId, title }: Project): JSX.Element {
  return (
    <MyLink
      display="flex"
      flexDir="column"
      bg="white"
      w="fit-content"
      minH="200px"
      className="shadow-1"
      borderRadius="10px"
      to={ `/projects/${ toKebab(title) }` }
    >
      <Text mb={ 2 } mt={ 2 } mx={ 2 } fontWeight="bold" fontSize="2xl">{ title }</Text>
      <ImageEle width="300px" meta={ imageId } />
    </MyLink>
  )
}

export default function Projects () {
  const [projects] = useProjects()

  return (
    <Flex w="100%" flexDirection="column" className="">
      <MyHelmet title="TBG - Projects" description="This show cases some of the projects Tristan Barlow-Griffin - Fullstack Software Engineer - Cornwall UK has worked on." />
      <p className="title is-3 is-size-5-mobile">My Projects</p>
      <Grid alignItems="center" justifyContent="center" templateColumns="repeat(auto-fill)">
        { projects.map(x => <ProjectTile key={ x.title } { ...x } />) }
      </Grid>
    </Flex>
  )
}