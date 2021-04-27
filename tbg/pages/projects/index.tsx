import { InferGetStaticPropsType, GetStaticPropsResult } from "next"
import Head from "next/head"
import { firestore } from "../../common/firestore"
import { toTitle } from "../../common/util"
import { Project } from "../../types/project"
import styles from './projects.module.css'

export default function Projects({ projects }: InferGetStaticPropsType<typeof getStaticProps>){

  return (
    <div>
      <Head>
        <title>Projects - Tristan Barlow-Griffin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        {
          projects.map(proj => <article key={proj.title}>
            {toTitle(proj.title)}
          </article>
          )
        }
      </div>
    </div>
  )
}

interface ProjectsPage {
  projects: Project[]
}
export async function getStaticProps(): Promise<GetStaticPropsResult<ProjectsPage>> {
  const projects = await firestore().collection('projects').get()

  return {
    props: {
      projects: projects.docs.map(x => x.data()) as Project[]
    },
    revalidate: 60
  }
}
