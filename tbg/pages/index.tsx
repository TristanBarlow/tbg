import PageMeta from 'components/pageMeta'
import Image from 'next/image'
import styles from './Home.module.css'

export default function Home() {
  return (
    <main className="pageContainer">
      <PageMeta 
        title="Home - Tristan Barlow-Griffin"
        description="This is the personal website of Tristan Barlow-Griffin - Fullstack Software Engineer - Cornwall UK"
      />
      <article className={styles.main}>
        <Image className={"shadow1 " + styles.me}  alt="Its me :)" src="/me.png" width={200} height={150}/>
        <p className={styles.name}>Tristan Barlow-Griffin</p>
        <p>Full Stack Software Engineer</p>
        <p>Cornwall, UK</p>
        <p style={{width:10}}>UK</p>
        <section className={styles.icons}>
          <a href="https://linkedin.com/in/tristan-barlow-griffin-2b4a4817a/" rel="noopener noreferrer" target="_blank" className="selectable p-x-md">
            <Image alt="Link to linkin"  src="/linked-in.png" width={70} height={70} />
          </a>
          <a href="https://github.com/TristanBarlow" target="_blank" rel="noopener noreferrer" className="selectable p-x-md" >
            <Image alt="Link to github" src="/git-hub.png" width={70} height={70}  />
          </a>
        </section>
      </article>
    </main>
  )
}
