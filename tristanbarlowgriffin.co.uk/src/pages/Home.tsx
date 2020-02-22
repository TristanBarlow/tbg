import React from 'react'
import Me from '../assets/images/me.png'

export default class Home extends React.Component<{}>{

  render () {
    return (
      <div className="tile is-parent">
        <div className="title"></div>
        <div className="tile is-child center-a col flex">
          <div className="section">
            <img src={ Me } style={ { borderRadius: '25%', height: 'auto', width: '200px' } } />
          </div>
          <p className="title is-1  is-size-4-mobile">Tristan Barlow-Griffin</p>
          <p className="title is-4 is-size-6-mobile">Full Stack Software Engineer</p>
          <p className="title is-5 is-size-7-mobile">Cornwall, UK</p>
        </div>
      </div>
    )
  }
}