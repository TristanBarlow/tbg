/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useEffect } from 'react'
import ImageManager from '../components/ImageManager'
import ProjectManager from '../components/ProjectManager'
import { Route, Switch, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Auth } from '../ts/Auth'

export default function Manage () {
  const history = useHistory()
  useEffect(() => {
    if (!Auth.key) {
      history.push('/admin/login')
    }
  }, [history])

  return (
    <div>
      <div className="tabs">
        <ul>
          <Link to="/admin/images">Images</Link>
          <Link to="/admin/projects">Projects</Link>
        </ul>
      </div>
      <div>
        <Switch>
          <Route path="/admin/images"><ImageManager /></Route>
          <Route><ProjectManager /></Route>
        </Switch>
      </div>
    </div>
  )
}