import express from 'express'
import env from './env'
import { imageUploadHandler, getImageHandler, getAllImageHandler, deleteImageHandler } from './images'
import { createHandler, getProjects, deleteProjectHandler, } from './projects'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json(), (req, res, next) => {
  console.log('PATH: ', req.path, 'METHOD: ', req.method, ' QUERY: ', req.query, ' IP: ', req.ip)
  next()
})

app.get('/api/projects', getProjects)
app.post('/api/projects/create', createHandler)
app.delete('/api/projects/:id', deleteProjectHandler)

app.get('/api/image/:id', getImageHandler)
app.get('/api/images', getAllImageHandler)
app.post('/api/image/:id', imageUploadHandler)
app.delete('/api/image/:id', deleteImageHandler)

app.listen(env.PORT)