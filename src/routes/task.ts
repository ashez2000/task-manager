import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('get all tasks')
})

router.post('/', (req, res) => {
  res.status(201).send('create task')
})

router.get('/:id', (req, res) => {
  res.send('get task by id')
})

router.put('/:id', (req, res) => {
  res.send('update task by id')
})

router.delete('/:id', (req, res) => {
  res.send('delete task by id')
})

export default router
