import React from 'react'
import ProjectAdd from '../components/ProjectAdd'
import { Project } from '../@types/project'
import { apiRequest } from '../ts/request'
import { toKebab } from '../shared/util'

interface State {
  showProjectAdd: boolean
  projects: Project[]
  activeProject: Project | null
}
export default class ProjectManager extends React.Component<{}, State>{
  state: State = { showProjectAdd: false, projects: [], activeProject: null }

  constructor (p: {}) {
    super(p)
    this.loadProjects()
  }

  async loadProjects () {
    const response = await apiRequest<Project[]>('/api/projects', 'GET', 'json')
    if (response.status === 200 && response.data)
      this.setState({ projects: response.data })
  }

  close () {
    this.setState({ showProjectAdd: false })
    this.loadProjects()
  }

  get projectAdd (): JSX.Element | null {
    if (!this.state.showProjectAdd) return null
    return (
      <ProjectAdd proj={ this.state.activeProject } close={ () => this.close() } />
    )
  }

  async delete (x: Project) {
    await apiRequest('/api/projects/' + toKebab(x.title), 'DELETE', 'text')
    this.loadProjects()
  }

  get projects (): JSX.Element {
    return (
      <div className="tile">
        { this.state.projects.map(x =>
          <div key={ x.title } className="tile is-parent is-3">
            <div className="tile is-child box col">
              <p className="subtitle is-4">Title: { x.title }</p>
              <p className="subtitle is-5">link: { x.link }</p>
              <p className="subtitle is-4">GIF: { x.gifId }</p>
              <p className="subtitle is-4">Image: { x.imageId }</p>
              <p className="subtitle is-7">Description: { x.description }</p>
              <div className="center" style={ { marginTop: '10px' } }>
                <div className="field is-grouped">
                  <button onClick={ () => this.setState({ showProjectAdd: true, activeProject: x }) } className="button is-link"> Update</button>
                  <button onClick={ () => this.delete(x) } className="button is-danger"> Delete</button>
                </div>
              </div>
            </div>
          </div>
        ) }
      </div>
    )
  }

  render (): JSX.Element {
    return (
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical">
          <div className="title">Projects</div>
          <button
            onClick={ () => this.setState({ showProjectAdd: true }) }
            style={ { width: 'fit-content' } }
            className="button is-primary">
            Upload New Project
          </button>
          { this.projects }
        </div>
        { this.projectAdd }
      </div >
    )
  }
}