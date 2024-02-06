import express from 'express'
import taskRoutes from './routes/task.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use('/tasks', taskRoutes)

export default app
