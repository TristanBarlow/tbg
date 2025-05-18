import { Helmet } from 'react-helmet'

interface Props {
  title: string
  description: string
}
export default function MyHelmet({ description, title }: Props) {
  return (
    <Helmet>
      <title>{ title }</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}
