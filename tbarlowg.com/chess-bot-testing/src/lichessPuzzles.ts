export const PUZZLES_URLS = [
  'https://huggingface.co/datasets/Lichess/chess-puzzles/resolve/main/data/train-00001-of-00003.parquet',
]

export interface LichessPuzzle {
  PuzzleId: string
  FEN: string
  Moves: string
  Rating: number
  RatingDeviation: number
  Popularity: number
  NbPlays: number
  Themes: { list: { element: string }[] }
  GameUrl: string
  OpeningTags: null
}
