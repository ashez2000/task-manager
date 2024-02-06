import { test, expect } from 'vitest'
import supertest from 'supertest'
import app from '../src/app.js'

test('GET /tasks', async () => {
  const res = await supertest(app).get('/tasks')
  expect(res.status).toBe(200)
})

test('POST /tasks', async () => {
  const res = await supertest(app).post('/tasks')
  expect(res.status).toBe(201)
})

test('GET /tasks/:id', async () => {
  const res = await supertest(app).get('/tasks/123')
  expect(res.status).toBe(200)
})

test('PUT /tasks/:id', async () => {
  const res = await supertest(app).put('/tasks/123')
  expect(res.status).toBe(200)
})

test('DELETE /tasks/:id', async () => {
  const res = await supertest(app).delete('/tasks/123')
  expect(res.status).toBe(200)
})
