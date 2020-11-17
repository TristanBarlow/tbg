import express from 'express'
import env from './env'
import { imageUploadHandler, getImageHandler, getAllImageHandler, deleteImageHandler } from './images'
import { createHandler, getProjects, deleteProjectHandler, } from './projects'
import { validateKeyBody, validateKeyHeader } from './auth/auth'
import { resolve } from 'path'
import cors from 'cors'

const app = express()
app
  .use(cors({
    allowedHeaders: '*',
    origin: '*'
  }))
  .use(express.json())
  .use((req, res, next) => {
    console.log('PATH: ', req.path, 'METHOD: ', req.method, ' QUERY: ', req.query, ' IP: ', req.ip)
    next()
  })


app.get('/api/projects', getProjects)
app.get('/api/image/:id', getImageHandler)

app.get(/^(?!\/api).+/, express.static(resolve(__dirname, '..', 'build')))

app.post('/api/validate', validateKeyBody)
app.use(validateKeyHeader)
app.get('/api/images', getAllImageHandler)
app.post('/api/image/:id', imageUploadHandler)
app.delete('/api/image/:id', deleteImageHandler)
app.post('/api/projects/create', createHandler)
app.delete('/api/projects/:id', deleteProjectHandler)

app.listen(env.PORT)