import React from 'react'
import { Project } from '@tbg/types/src/project'
import { toKebab } from '@tbg/util'
import { Flex, Grid, Text } from '@chakra-ui/react'
import { ImageEle } from '../components/Image'
import MyHelmet from '../components/MyHelmet'
import MyLink from '../components/MyLink'
import { projects } from '../ts/projects'

function ProjectTile({ imageURI, title }: Project): React.JSX.Element {
  return (
    <MyLink
      display="flex"
      flexDir="column"
      bg="white"
      minH="100px"
      h="fit-content"
      className="shadow-1"
      borderRadius="10px"
      to={`/projects/${toKebab(title)}`}
    >
      <Text mb={2} mt={2} mx={2} fontWeight="bold" fontSize="2xl">{ title }</Text>
      <ImageEle borderRadius="8px" h="250px" w="auto" uri={imageURI} />
    </MyLink>
  )
}

export default function Projects() {
  return (
    <Flex w="100%" flexDirection="column" className="">
      <MyHelmet title="TBG - Projects" description="This show cases some of the projects Tristan Barlow-Griffin - Fullstack Software Engineer - Cornwall UK has worked on." />
      <p className="title is-3">My Projects</p>
      <Grid py={1} justifyContent="center" rowGap={2} columnGap={2} templateColumns="repeat(auto-fill, minmax(100px, 300px))">
        { projects.map(x => <ProjectTile key={x.title} {...x} />) }
      </Grid>
    </Flex>
  )
}
