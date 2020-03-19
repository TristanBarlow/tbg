
export abstract class ChessPlayer {
  abstract isHuman: boolean
  abstract getMove (fen: string): Promise<string | null>
}