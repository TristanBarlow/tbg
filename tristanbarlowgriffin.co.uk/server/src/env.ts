export interface Env {
  PORT: string
}

const env: Env = {
  PORT: process.env.PORT || '8080'
}

console.warn('STARTING SERVER WITH ENV: ', env)
export default env