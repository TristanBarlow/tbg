import React from 'react'
import Me from '../assets/images/me.png'
import LinkedIn from '../assets/images/linked-in.png'
import GitHub from '../assets/images/git-hub.png'
import ImageEle from '../components/Image'

export default class Home extends React.Component<{}>{

  render () {
    return (
      <div className="tile is-parent">
        <div className="title"></div>
        <div className="tile is-child center-a col flex">
          <div className="section">
            <img alt="Its me :)" src={ Me } style={ { borderRadius: '25%', height: 'auto', width: '200px' } } />
          </div>
          <p className="title is-1  is-size-4-mobile">Tristan Barlow-Griffin</p>
          <p className="title is-4 is-size-6-mobile">Full Stack Software Engineer</p>
          <p className="title is-5 is-size-7-mobile">Cornwall, UK</p>
          <div className="row">
            <a href="https://linkedin.com/in/tristan-barlow-griffin-2b4a4817a/" rel="noopener noreferrer" target="_blank" className="selectable p-x-md">
              <ImageEle width="70px" meta={ LinkedIn } />
            </a>
            <a href="https://github.com/TristanBarlow" target="_blank" rel="noopener noreferrer" className="selectable p-x-md" >
              <ImageEle width="70px" meta={ GitHub } />
            </a>
          </div>
        </div>
      </div>
    )
  }
}