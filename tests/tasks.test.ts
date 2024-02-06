import { test, expect } from 'vitest'
import supertest from 'supertest'
import app from '../src/app.js'

test('GET /tasks', async () => {
  const res = await supertest(app).get('/tasks')
  expect(res.status).toBe(200)
  expect(res.body.length).toBe(15)
})

test('POST /tasks', async () => {
  const newTask = {
    title: 'New Task',
    description: 'New Task Description',
    completed: false,
  }

  const res = await supertest(app).post('/tasks').send(newTask)
  expect(res.status).toBe(201)
})

test('POST /tasks with invalid data', async () => {
  const newTask = {
    title: 'New Task',
  }

  const res = await supertest(app).post('/tasks').send(newTask)
  expect(res.status).toBe(400)
})

test('GET /tasks/:id', async () => {
  const res = await supertest(app).get('/tasks/1')

  const expectedTask = {
    id: 1,
    title: 'Set up environment',
    description: 'Install Node.js, npm, and git',
    completed: true,
  }

  expect(res.status).toBe(200)
  expect(res.body.title).toBe(expectedTask.title)
  expect(res.body.description).toBe(expectedTask.description)
  expect(res.body.completed).toBe(expectedTask.completed)
})

test('GET /tasks/:id with invalid id', async () => {
  const res = await supertest(app).get('/tasks/999')
  expect(res.status).toBe(404)
})

test('PUT /tasks/:id', async () => {
  const updatedTask = {
    title: 'Updated Task',
    description: 'Updated Task Description',
    completed: true,
  }

  const res = await supertest(app).put('/tasks/1').send(updatedTask)
  expect(res.status).toBe(200)
})

test('PUT /tasks/:id with invalid id', async () => {
  const updatedTask = {
    title: 'Updated Task',
    description: 'Updated Task Description',
    completed: true,
  }

  const res = await supertest(app).put('/tasks/999').send(updatedTask)
  expect(res.status).toBe(404)
})

test('PUT /tasks/:id with invalid data', async () => {
  const updatedTask = {
    title: 'Updated Task',
    description: 'Updated Task Description',
    completed: 'true',
  }

  const res = await supertest(app).put('/tasks/1').send(updatedTask)
  expect(res.status).toBe(400)
})

test('DELETE /tasks/:id', async () => {
  const res = await supertest(app).delete('/tasks/1')
  expect(res.status).toBe(200)
})

test('DELETE /tasks/:id with invalid id', async () => {
  const res = await supertest(app).delete('/tasks/999')
  expect(res.status).toBe(404)
})
