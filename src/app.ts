import express, { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

import taskRoutes from './routes/task.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use('/tasks', taskRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: 'route not found',
  })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const e = fromZodError(err)
    return res.status(400).json({
      message: e.message,
    })
  }

  console.error(err)
  res.status(500).json({
    message: 'internal server error',
  })
}

app.use(errorHandler)

export default app
