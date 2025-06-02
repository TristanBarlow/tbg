import { resolve } from 'path'
process.env.TZ = 'Europe/London'

export enum Mode {
  Dev = 'dev',
  Prod = 'prod',
}

export interface Env {
  PORT: string
  MODE: Mode
  KEY: string
}

export const CONFIG: Env = {
  PORT: process.env.PORT || '8080',
  MODE: process.env.MODE !== 'prod' ? Mode.Dev : Mode.Prod,
  KEY: process.env.KEY || 'test',
}

export function getCredentials() {
  if (CONFIG.MODE === Mode.Dev) {
    return { keyFilename: resolve('./image-manager-SA.json') }
  }

  return
}

console.warn('STARTING SERVER WITH ENV: ', CONFIG)
