import { MANAGE_KEY } from '../key'
import { RequestHandler } from 'express'

// eslint-disable-next-line
function IsKeyValid (a: any): boolean {
  if (typeof a !== 'string') return false
  return a === MANAGE_KEY
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
  if (req.body.key === MANAGE_KEY) {
    return res.sendStatus(200)
  }
  res.sendStatus(401)
}