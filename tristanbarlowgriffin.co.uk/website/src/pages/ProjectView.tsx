import React from 'react'
import { lastPart, toTitle } from '@tbg/util'
import { Project } from '../../../packages/types/src/project'

interface Props extends Project {

}
export default function ProjectView (props: Props) {

  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <p className="title is-3 is-size-5-mobile">{ lastPart(window.location.pathname) }</p>
      </div>
    </div>
  )
}