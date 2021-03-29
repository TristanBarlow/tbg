declare const process: any;
export interface Config {
  REACT_APP_SERVER_URL: string
  REACT_APP_CHESS_SERVER: string
}

export const CFG: Config = process.env

