
export abstract class ChessPlayer {
  abstract name: string
  abstract isHuman: boolean
  abstract getMove (fen: string): Promise<string | null>
}