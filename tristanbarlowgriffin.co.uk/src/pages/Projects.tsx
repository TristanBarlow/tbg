import React from 'react'

export default class Projects extends React.Component<{}>{

  render () {
    return (
      <div className="tile is-parent">
        <div className="title"></div>
        <div className="tile is-child center-a col flex">
          <p className="title is-1  is-size-4-mobile">Projects</p>
        </div>
      </div>
    )
  }
}