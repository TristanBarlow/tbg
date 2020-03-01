import express from 'express'
import env from './env'
import { imageUploadHandler, getImageHandler, getAllImageHandler, deleteImageHandler } from './images'
import { createHandler, getProjects, deleteProjectHandler, } from './projects'
import bodyParser from 'body-parser'
import { ValidateKeyHeader } from './auth/auth'

const app = express()
app.use(bodyParser.json(), (req, res, next) => {
  console.log('PATH: ', req.path, 'METHOD: ', req.method, ' QUERY: ', req.query, ' IP: ', req.ip)
  next()
})

app.get('/api/projects', getProjects)
app.get('/api/image/:id', getImageHandler)

app.use(ValidateKeyHeader)
app.get('/api/validate', (req, res) => res.sendStatus(200))
app.get('/api/images', getAllImageHandler)
app.post('/api/image/:id', imageUploadHandler)
app.delete('/api/image/:id', deleteImageHandler)
app.post('/api/projects/create', createHandler)
app.delete('/api/projects/:id', deleteProjectHandler)

app.listen(env.PORT)