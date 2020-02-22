import express from 'express'
import env from './env'
import { projects } from './projects'

const app = express()
app.use((req, res, next) => {
  console.log('PATH: ', req.path, ' QUERY: ', req.query, ' IP: ', req.ip)
  next()
})

app.get('/api/projects', (req, res) => {
  res.send(projects)
})
app.listen(env.PORT)