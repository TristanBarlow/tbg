import { resolve } from 'path'

export interface Env {
  PORT: string
  MODE: 'dev' | 'prod'
}

const env: Env = {
  PORT: process.env.PORT || '8080',
  MODE: process.env.MODE !== 'prod' ? 'dev' : 'prod'
}

export function serviceAccountPath (): string | undefined {
  if (env.MODE === 'dev') return resolve(__dirname, '..', 'image-manager-SA.json')
  return undefined
}

console.warn('STARTING SERVER WITH ENV: ', env)
export default env