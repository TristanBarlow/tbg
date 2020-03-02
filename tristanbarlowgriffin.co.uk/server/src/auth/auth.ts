import { MANAGE_KEY } from '../key'
import { RequestHandler } from 'express'

function IsKeyValid (a: any): boolean {
  if (typeof a !== 'string') return false
  return a === MANAGE_KEY
}

export const ValidateKeyHeader: RequestHandler = (req, res, next) => {
  const key = req.headers.key
  if (!IsKeyValid(key)) {
    console.error('Failed Key attempt. GOT: ', key)
    return res.sendStatus(401)
  }

  next()
}