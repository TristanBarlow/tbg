/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react'
import ImageManager from '../components/ImageManager'
import ProjectManager from '../components/ProjectManager'
import { Route, Switch, useHistory } from 'react-router'

enum Tabs {
  PROJECTS = 'projects',
  IMAGES = 'images'
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
export default function Manage () {
  const history = useHistory()
  const parts = window.location.pathname.split('/')

  function makeTab (t: Tab) {
    return (
      <li onClick={ () => history.push(t.path) } ><a>{ t.title }</a></li>
    )
  }

  return (
    <div>
      <div className="tabs">
        <ul>
          { tabs.map(x => makeTab(x)) }
        </ul>
      </div>
      <div>
        <Switch>
          <Route path="/images"><ImageManager /></Route>
          <Route><ProjectManager /></Route>
        </Switch>
      </div>
    </div>
  )
}