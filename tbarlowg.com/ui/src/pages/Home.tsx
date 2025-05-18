import Me from '../assets/images/me.png'
import LinkedIn from '../assets/images/linked-in.png'
import GitHub from '../assets/images/git-hub.png'
import MyHelmet from '../components/MyHelmet'

export default function Home() {
  return (
    <div className="tile is-parent">
      <div className="title" />
      <MyHelmet title="TBG - Home" description="This is the personal website of Tristan Barlow-Griffin - Fullstack Software Engineer - Cornwall UK" />
      <div className="tile is-child center-a col flex">
        <div className="section">
          <img className="shadow-1" alt="Its me :)" src={Me} style={{ borderRadius: '25%', height: 'auto', width: '200px' }} />
        </div>
        <p className="title is-1  is-size-4-mobile">Tristan Barlow-Griffin</p>
        <p className="title is-4 is-size-6-mobile">Full Stack Software Engineer</p>
        <p className="title is-5 is-size-7-mobile">Cornwall, UK</p>
        <div className="row">
          <a href="https://linkedin.com/in/tristan-barlow-griffin-2b4a4817a/" rel="noopener noreferrer" target="_blank" className="selectable p-x-md">
            <img alt="LinkedIn" width="70px" src={LinkedIn} />
          </a>
          <a href="https://github.com/TristanBarlow" target="_blank" rel="noopener noreferrer" className="selectable p-x-md">
            <img alt="LinkedIn" width="70px" src={GitHub} />
          </a>
        </div>
      </div>
    </div>
  )
}
