import { ParquetReader } from '@dsnp/parquetjs'
import { setupTests } from './fileUtils'
import { LichessPuzzle } from './lichessPuzzles'
import { MoveResponse, getMoveMinMax, getMoveRoundRobin } from '@tbg/chess-bots'
import { options } from 'yargs'
import { Chess } from 'chess.js'
import { mkdir, writeFile } from 'fs/promises'

type BotKey = 'minmax' | 'roundrobin'
const botOptions: BotKey[] = ['minmax', 'roundrobin']
const { maxRating, bot, maxTime, limit, minELO, skip, fen } = options({
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
  limit: {
    alias: 'limit',
    number: true,
    default: 100,
  },
  skip: {
    number: true,
    default: 0,
  },
  minELO: {
    number: true,
    default: 0,
  },
  fen: {
    string: true,
  },
}).parseSync()

const bots = {
  minmax: fen => getMoveMinMax({ fen, maxTime }),
  roundrobin: fen => getMoveRoundRobin({ fen, maxTime }),
} satisfies Record<BotKey, (fen: string) => MoveResponse>

const keys: (keyof LichessPuzzle)[] = ['FEN', 'Rating', 'Moves']

const outputDir = 'output'

async function run() {
  await mkdir(outputDir, { recursive: true }).catch(console.error)
  const { testFileOnePath } = await setupTests()
  const reader = await ParquetReader.openFile(testFileOnePath)

  // Cursor type is wrong
  const cursor = reader.getCursor(keys as unknown as unknown[][])
  console.log('Total Rows:', reader.getRowCount().toNumber())
  let row: LichessPuzzle | null = null

  const allPuzzles: LichessPuzzle[] = []
  // eslint-disable-next-line no-cond-assign
  while (row = await cursor.next() as LichessPuzzle | null) {
    if (fen && row.FEN !== fen) continue
    if (maxRating && row.Rating > maxRating) continue
    allPuzzles.push(row)
  }

  const puzzles = allPuzzles
    .map((p) => {
      p.Rating = Number(p.Rating)
      return p
    })
    .sort((a, b) => a.Rating - b.Rating)
    .filter(puz => puz.Rating >= minELO)
    .slice(skip, skip + limit)

  const botKeysToTest = (bot ? [bot] : Object.keys(bots)) as BotKey[]
  botKeysToTest.forEach((key) => {
    runPuzzlesTest(puzzles, key)
  })
}

const LOG_INTERVAL = 1
async function runPuzzlesTest(puzzles: LichessPuzzle[], botKey: BotKey) {
  const countMap: CountMap = {
    failed: 0,
    failedIds: [],
    partialSuccess: 0,
    total: 0,
    success: 0,
  }

  function statStr(key: string, value: number) {
    return `\n${key}: ${value} (${((value / countMap.total) * 100).toFixed(2)}%)`
  }

  console.log(`--------- ${botKey} ---------`)

  function getStats() {
    return [
      statStr('Success', countMap.success),
      statStr('Failed', countMap.failed),
      statStr('Partial Success', countMap.partialSuccess),
    ]
  }

  const game = new Chess()
  const failedMoves: (LichessPuzzle & { failedMoves?: string[] })[] = []
  for (const [index, puzzle] of puzzles.entries()) {
    const { success, moves } = testBotPuzzle({
      botKey,
      countMap,
      game,
      puzzle,
    })

    if (!success) {
      failedMoves.push({
        failedMoves: moves,
        ...puzzle,
      })
      await writeFile(`${outputDir}/${botKey}_FAILED_MOVES.json`, JSON.stringify(failedMoves, undefined, 4))
    }

    if (index % LOG_INTERVAL) return
    console.log(statStr(`${botKey} - Processed`, index), ...getStats())
  }

  console.log(
    `--------- ${botKey} ----------\n`,
    ...getStats(),
  )
}

interface CountMap {
  success: number
  total: number
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

interface PuzzleAttemptResponse {
  success: boolean
  moves?: string[]
}

function testBotPuzzle({ botKey, game, puzzle, countMap }: TestBotPuzzleProps): PuzzleAttemptResponse {
  const { FEN, Moves, PuzzleId } = puzzle
  // Setup the test
  const [openingMove, ...rest] = Moves.split(' ')
  game.load(FEN, { skipValidation: true })
  game.move(openingMove)
  countMap.total++

  let partialSuccess = false
  const moves: string[] = []
  for (const actualMove of rest) {
    const botMove = bots[botKey](game.fen())
    const move = botMove.move
      ? game.move(botMove.move)
      : null

    const longFormMove = `${move?.from}${move?.to}${move?.promotion ?? ''}`
    moves.push(longFormMove)
    if (longFormMove !== actualMove) {
      if (partialSuccess) {
        countMap.partialSuccess++
      }
      countMap.failedIds.push(PuzzleId)
      countMap.failed++
      return { success: false, moves }
    }
    partialSuccess = true
  }

  countMap.success++
  return { success: true }
}

run().catch(console.error)
