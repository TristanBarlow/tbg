import { z } from 'zod'

export enum Mode {
  prod = 'prod',
  test = 'test',
}

const envSchema = z.object({
  SERVER_URL: z.string().url(),
  MODE: z.nativeEnum(Mode),
})

function parseEnv() {
  const entries = Object
    .entries(import.meta.env)
    .map(([key, value]) => [key.replace('VITE_', ''), value])

  return envSchema.parse(Object.fromEntries(entries))
}

export const CFG = parseEnv()
