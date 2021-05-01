import Head from "next/head"

interface Props{
  title: string
  description: string
}
export default function PageMeta({description, title}: Props){
  return (
    <Head>
      <title >{title}</title>
      <meta name="description" content={description}/>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
