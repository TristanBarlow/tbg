import React from 'react'
import { apiRequest } from '../ts/request'
import { Project } from '../@types/project'
import ImageEle from '../components/Image'
import { NavBar } from '../components/NavBar'
import { toKebab } from '../shared/util'

interface State {
  projects: Project[]
}
export default class Projects extends React.Component<{}, State>{
  state = { projects: [] }

  constructor (p: {}) {
    super(p)

    apiRequest<Project[]>('/api/projects', 'GET', 'json').then(x => this.setState({ projects: x.data || [] }))
  }

  openProject (name: string) {
    NavBar.push(`/projects/${ toKebab(name) }`)
  }

  projectTile (proj: Project): JSX.Element {
    return (
      <div className="tile is-parent selectable" onClick={ () => this.openProject(proj.title) }>
        <div className="tile is-child box" >
          <p className="title is-5">{ proj.title }</p>
          <p></p>
          <div className="center">
            <ImageEle url={ proj.imgUrl } />
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="">
        <p className="title is-3 is-size-5-mobile">My Projects</p>
        <div className="tile is-ancestor ">
          { this.state.projects.map(x => this.projectTile(x)) }
        </div>
      </div>
    )
  }
}