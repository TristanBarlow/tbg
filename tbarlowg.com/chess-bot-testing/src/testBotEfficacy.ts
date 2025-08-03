import { ParquetReader } from '@dsnp/parquetjs'
import { setupTests } from './fileUtils'
import { LichessPuzzle } from './lichessPuzzles'
import { MoveResponse, getMoveMinMax, getMoveRoundRobin } from '@tbg/chess-bots'
import { options } from 'yargs'
import { Chess } from 'chess.js'

type BotKey = 'minmax' | 'roundrobin'
const botOptions: BotKey[] = ['minmax', 'roundrobin']
const { maxRating, bot, maxTime } = options({
  maxRating: {
    number: true,
    alias: 'r',
  },
  bot: {
    alias: 'b',
    string: true,
    options: botOptions,
  },
  maxTime: {
    default: 3000,
    number: true,
  },
}).parseSync()

const bots = {
  minmax: fen => getMoveMinMax({ fen, maxTime }),
  roundrobin: fen => getMoveRoundRobin({ fen, maxTime }),
} satisfies Record<BotKey, (fen: string) => MoveResponse>

const keys: (keyof LichessPuzzle)[] = ['FEN', 'Rating', 'Moves']

async function run() {
  const { testFileOnePath } = await setupTests()
  const reader = await ParquetReader.openFile(testFileOnePath)

  // Cursor type is wrong
  const cursor = reader.getCursor(keys as unknown as unknown[][])
  console.log('Total Rows:', reader.getRowCount().toNumber())
  let row: LichessPuzzle | null = null

  const puzzles: LichessPuzzle[] = []
  // eslint-disable-next-line no-cond-assign
  while (row = await cursor.next() as LichessPuzzle | null) {
    if (maxRating && row.Rating > maxRating) continue
    puzzles.push(row)
  }

  puzzles.sort((a, b) => a.Rating - b.Rating)

  const botKeysToTest = (bot ? [bot] : Object.keys(bots)) as BotKey[]
  botKeysToTest.forEach((key) => {
    runPuzzlesTest(puzzles, key)
  })
}

const LOG_INTERVAL = 10_000
function runPuzzlesTest(puzzles: LichessPuzzle[], botKey: BotKey) {
  const countMap: CountMap = {
    failed: 0,
    failedIds: [],
    partialSuccess: 0,
    success: 0,
  }

  function statStr(key: string, value: number) {
    return `\n${key}: ${value} (${(value / puzzles.length).toFixed(2)}%)`
  }

  console.log(`--------- ${botKey} ---------`)
  const game = new Chess()
  puzzles.forEach((puzzle, index) => {
    testBotPuzzle({
      botKey,
      countMap,
      game,
      puzzle,
    })

    if (index % LOG_INTERVAL) return
    console.log(statStr('Processed', index))
  })

  console.log(
    `--------- ${botKey} ----------\n`,
    statStr('Success', countMap.success),
    statStr('Failed', countMap.failed),
    statStr('Partial Success', countMap.partialSuccess),
  )
}

interface CountMap {
  success: number
  failed: number
  partialSuccess: number
  failedIds: string[]
}

interface TestBotPuzzleProps {
  puzzle: LichessPuzzle
  botKey: BotKey
  game: Chess
  countMap: CountMap
}

function testBotPuzzle({ botKey, game, puzzle, countMap }: TestBotPuzzleProps) {
  const { FEN, Moves, PuzzleId } = puzzle
  // Setup the test
  const [openingMove, ...rest] = Moves.split(' ')
  game.load(FEN, { skipValidation: true })
  game.move(openingMove)

  for (const actualMove of rest) {
    const botMove = bots[botKey](game.fen())
    if (botMove.move !== actualMove) {
      countMap.failedIds.push(PuzzleId)
      countMap.failed++
      return
    }
    countMap.partialSuccess++
    game.move(actualMove)
  }

  countMap.success++
}

run().catch(console.error)
