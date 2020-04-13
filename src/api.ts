import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import path from 'path'
import { API_HOST, API_PORT, DEBUG, LOG_PATH } from './config'
import { listFiles, readFile } from './domain'

const MORGAN_LOG_LEVEL = DEBUG === 'info'
  ? 'common'
  : 'dev'

const app = express()

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan(MORGAN_LOG_LEVEL))

app.get('/files/:filename', async (req: Request, res: Response): Promise<Response | void> => {
  const {
    filename,
    limit,
    filter
  } = req.params

  const files = await listFiles(LOG_PATH)

  if (!files.includes(filename)) {
    return res.status(400).json({ error: 'bad file name' })
  }

  if (limit && Number.isNaN(parseInt(limit, 10))) {
    return res.status(400).json({ error: 'limit must be a number' })
  }

  const options = {
    limit: parseInt(limit, 10),
    filter
  }

  await readFile(path.join(LOG_PATH, filename), res, options)

  return res.end()
})

app.get('/files', async (_req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ files: await listFiles(LOG_PATH) })
})

app.get('/status', (_req: Request, res: Response): Response => {
  return res.status(200).json({ ok: true })
})

// Handle all invalid routes. This must be the last route in the chain
app.all('*', (_req: Request, res: Response): Response => {
  return res.status(404).json({ error: 'Not Found' })
})

export default (): void => {
  app.listen(API_PORT, API_HOST, () => {
    return console.log(`Started local server at http://${API_HOST}:${API_PORT}`)
  })
}
