import express from 'express'
import env from './env'
import { createHandler, getProjects, imageUploadHandler, getImageHandler } from './projects'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json(), (req, res, next) => {
  console.log('PATH: ', req.path, ' QUERY: ', req.query, ' IP: ', req.ip)
  next()
})

app.get('/api/projects', getProjects)
app.post('/api/projects/create', createHandler)
app.post('/api/image/:id', imageUploadHandler)
app.get('/api/image/:id', getImageHandler)
app.listen(env.PORT)