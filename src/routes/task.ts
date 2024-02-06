import { Router } from 'express'
import { taskInputSchema } from '../schema/task.js'
import taskStore from '../store/task.js'

const router = Router()

/** Get all tasks */
router.get('/', (req, res) => {
  const completed = new String(req.query.completed).toString()
  if (!['true', 'false', 'undefined'].includes(completed)) {
    return res.status(400).json({
      message: 'invalid value for query param: completed',
    })
  }

  const tasks = taskStore.findMany(completed as any)
  res.status(200).json(tasks)
})

/** Get tasks based on priority level */
router.get('/priority/:level', (req, res) => {
  const level = req.params.level
  if (!['low', 'medium', 'high'].includes(level)) {
    return res.status(400).json({
      message: 'invalid priority level',
    })
  }

  const tasks = taskStore.findByPriority(level as any)
  res.status(200).json(tasks)
})

/** Create new task */
router.post('/', (req, res) => {
  const input = taskInputSchema.parse(req.body)
  const task = taskStore.create(input)
  res.status(201).send(task)
})

/** Get task by id */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({
      message: 'invalid id',
    })
  }

  const task = taskStore.findById(id)
  if (!task) {
    return res.status(404).json({
      message: 'task not found',
    })
  }

  res.status(200).json(task)
})

/** Update task by id */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({
      message: 'invalid id',
    })
  }

  const input = taskInputSchema.parse(req.body)
  const task = taskStore.updateById(id, input)

  if (!task) {
    return res.status(404).json({
      message: 'task not found',
    })
  }

  res.status(200).json(task)
})

/** Delete task by id */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({
      message: 'invalid id',
    })
  }

  const task = taskStore.deleteById(id)
  if (!task) {
    return res.status(404).json({
      message: 'task not found',
    })
  }

  res.status(200).json(task)
})

export default router
