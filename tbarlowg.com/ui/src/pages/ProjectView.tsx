import { useMemo } from 'react'
import { toKebab } from '@tbg/util'
import { ProjectLink } from '@tbg/types'
import { useParams } from 'react-router'
import MyHelmet from '../components/MyHelmet'
import LoadingModal from '../components/LoadingModal'
import { Flex, Grid, Link, Text } from '@chakra-ui/react'
import { ImageEle } from '../components/Image'
import { projects } from '../ts/projects'

type RouterParams = {
  pId: string
}

function LinkView({ label, link }: ProjectLink) {
  return (
    <Flex mb={1} fontSize="lg" fontWeight="700" alignSelf="flex-start" flexDir="column">
      <Text mr={2}>
        { label }
        :
        {' '}
      </Text>
      <Link target="_blank" color="brand.1" href={link}>{ link }</Link>
    </Flex>
  )
}

export default function ProjectView() {
  const { pId } = useParams<RouterParams>()
  const activeProj = useMemo(() => projects.find(p => toKebab(p.title) === pId), [pId])
  if (!activeProj) {
    return <LoadingModal hideBG />
  }

  return (
    <Flex w="100%" alignItems="center" flexDir="column">
      <MyHelmet title={`TBG - ${activeProj.title}`} description={activeProj.description} />
      <Flex flexDir="column" w="100%" maxW="1200px">
        <p className="title is-3">{ activeProj.title }</p>
        <Grid maxW="1200px" justifyItems="center" justifyContent="center" w="100%" rowGap={4} columnGap={2} templateColumns="repeat(auto-fill, minmax(auto, 500px))">
          <Text maxW="600px" my={4}>{ activeProj.description }</Text>
          <ImageEle px={1} width="400px" uri={activeProj.gifURI} />
          <ImageEle width="400px" uri={activeProj.imageURI} />
          <Flex flexDir="column" alignItems="flex-end" rowGap={4} gridTemplateColumns="auto" w="100%">
            {
              activeProj.links?.map(x => <LinkView {...x} key={x.link} />)
            }
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  )
}
