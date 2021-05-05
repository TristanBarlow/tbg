import PageMeta from "components/pageMeta"
import ChessController from "./ChessController"

export default function ChessPage(){
  return (
    <main>
      <PageMeta title="TBG - Chess" description="This is a selection of chess bots written by myself that play against eachother (or you). The portfolio of bots will grow as I find more time to work on them"  />
      <title className="">Portfolio of chess bots (WIP)</title>
      <ChessController />
    </main>
  )
}
