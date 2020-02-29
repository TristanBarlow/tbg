import React from 'react'
import ImageManager from '../components/ImageManager'
import ProjectManager from '../components/ProjectManager'
import { NavBar } from '../components/NavBar'

enum Tabs {
  PROJECTS = 'projects',
  IMAGES = 'images'
}

function isTab (x: string | undefined): x is Tabs {
  return typeof x === 'string' && !!Object.keys(Tabs).find((y) => y === x)
}

interface State {
  activeTab: Tabs
}
interface Tab {
  title: string
  path: Tabs
}
const tabs: Tab[] = [
  {
    path: Tabs.PROJECTS,
    title: 'Projects'
  },
  {
    path: Tabs.IMAGES,
    title: 'Images'
  }
]
export default class Manage extends React.Component<{}, State>{
  constructor (p: {}) {
    super(p)

    const parts = window.location.pathname.split('/')
    let path = parts.pop() || parts.pop()

    const activeTab = isTab(path) ? path : Tabs.PROJECTS
    this.state = { activeTab }
    NavBar.push('/manage/' + activeTab)
  }

  route (loc: Tabs) {
    NavBar.push('/manage/' + loc)
    this.setState({ activeTab: loc })
  }

  makeTab (t: Tab): JSX.Element {
    const className = this.state.activeTab === t.path.toLowerCase() ? 'is-active' : ''
    return (
      <li onClick={ () => this.route(t.path) } className={ className }><a >{ t.title }</a></li>
    )
  }

  get content (): JSX.Element | null {
    switch (this.state.activeTab) {
      case Tabs.IMAGES:
        return <ImageManager />
      case Tabs.PROJECTS:
        return <ProjectManager />
      default:
        return null
    }
  }

  render (): JSX.Element {
    return (
      <div>
        <div className="tabs">
          <ul>
            { tabs.map(x => this.makeTab(x)) }
          </ul>
        </div>
        <div>
          { this.content }
        </div>
      </div>
    )
  }
}