import { RequestHandler } from 'express'
import { CONFIG } from '../env'

// eslint-disable-next-line
function IsKeyValid (a: any): boolean {
  if (typeof a !== 'string') return false
  return a === CONFIG.KEY
}

export const validateKeyHeader: RequestHandler = (req, res, next) => {
  const key = req.headers.key
  if (!IsKeyValid(key)) {
    console.error('Failed Key attempt. GOT: ', key)
    return res.sendStatus(401)
  }

  next()
}
export const validateKeyBody: RequestHandler = (req, res) => {
  console.log('Got validate attempt: ', req.body)
  if (req.body.key === CONFIG.KEY) {
    return res.sendStatus(200)
  }
  res.sendStatus(401)
}
