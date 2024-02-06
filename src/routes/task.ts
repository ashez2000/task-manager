import { Router } from 'express'
import { taskInputSchema } from '../schema/task.js'
import taskStore from '../store/task.js'

const router = Router()

router.get('/', (req, res) => {
  const tasks = taskStore.findMany()
  res.status(200).json(tasks)
})

router.post('/', (req, res) => {
  const { title, description, completed } = taskInputSchema.parse(req.body)

  const task = taskStore.create(title, description, completed)
  res.status(201).send(task)
})

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

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({
      message: 'invalid id',
    })
  }

  const { title, description, completed } = taskInputSchema.parse(req.body)

  const task = taskStore.updateById(id, title, description, completed)
  if (!task) {
    return res.status(404).json({
      message: 'task not found',
    })
  }

  res.status(200).json(task)
})

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
