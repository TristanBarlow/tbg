import { mkdir, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import { basename, join } from 'path'
import axios from 'axios'
import { existsSync } from 'fs'
import { PUZZLES_URLS } from './lichessPuzzles'

const TMP_DIR = join(tmpdir(), 'CHESS_BOTS')
export async function prepareTMPDir() {
  await mkdir(TMP_DIR, { recursive: true })
    // Catch and mute errors
    .catch(() => {})
}

export async function downloadPuzzleFile(fileURL: string) {
  const fileName = basename(fileURL)
  const pathName = join(TMP_DIR, fileName)
  if (existsSync(pathName)) {
    console.log('File:', fileURL, 'already exists locally')
    return pathName
  }

  console.log('Downloading:', fileURL)
  const stream = await axios.get(fileURL, { responseType: 'arraybuffer' })

  await writeFile(pathName, Buffer.from(stream.data))
  console.log('Wrote file to:', pathName)
  return pathName
}

export async function setupTests() {
  await prepareTMPDir()
  const [testFileOnePath] = await Promise.all(PUZZLES_URLS.map(downloadPuzzleFile))

  return {
    testFileOnePath,
  }
}
