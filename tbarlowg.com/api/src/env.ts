import { resolve } from 'path'
process.env.TZ = 'Europe/London'
export interface Env {
  PORT: string
  MODE: 'dev' | 'prod'
  KEY: string
}

export const CONFIG: Env = {
  PORT: process.env.PORT || '8080',
  MODE: process.env.MODE !== 'prod' ? 'dev' : 'prod',
  KEY: process.env.KEY || 'test',
}

export function serviceAccountPath(): string | undefined {
  if (CONFIG.MODE === 'dev') return resolve(__dirname, '..', 'image-manager-SA.json')
  return undefined
}

console.warn('STARTING SERVER WITH ENV: ', CONFIG)
