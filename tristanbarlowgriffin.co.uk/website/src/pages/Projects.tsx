import React from 'react'
import { Project } from '../../../packages/types/src/project'
import { toKebab } from '../shared/util'
import { useHistory } from 'react-router'
import { useProjects } from '../ts/projects'

function ProjectTile (proj: Project): JSX.Element {
  const history = useHistory()
  return (
    <div className="tile is-parent selectable" onClick={ () => history.push(`/projects/${ toKebab(proj.title) }`) }>
      <div className="tile is-child box" >
        <p className="title is-5">{ proj.title }</p>
        <div className="center">
        </div>
      </div>
    </div>
  )
}

export default function Projects () {
  const [projects] = useProjects()

  return (
    <div className="">
      <p className="title is-3 is-size-5-mobile">My Projects</p>
      <div className="tile is-ancestor ">
        { projects.map(x => <ProjectTile key={ x.title } { ...x } />) }
      </div>
    </div>
  )
}