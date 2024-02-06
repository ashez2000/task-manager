import fs from 'node:fs'
import crypto from 'node:crypto'
import { TaskInput } from '../schema/task.js'

const priorities = ['low', 'medium', 'high']
const tasks = JSON.parse(fs.readFileSync('./data/tasks.json', 'utf8')).map(
  (t: any) => {
    return {
      ...t,
      priority: priorities[crypto.randomInt(3)],
    }
  }
) as Task[]

export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

class TaskStore {
  private store = new Map<number, Task>()

  constructor(tasks?: Task[]) {
    if (tasks) {
      for (const t of tasks) {
        this.store.set(t.id, t)
      }
    }
  }

  findMany(completed: 'true' | 'false' | 'undefined'): Task[] {
    let tasks = [...this.store.values()]

    if (completed !== 'undefined') {
      tasks = tasks.filter((t) => t.completed.toString() === completed)
    }

    return tasks
  }

  findByPriority(priority: 'low' | 'medium' | 'high'): Task[] {
    let tasks = [...this.store.values()]
    tasks = tasks.filter((t) => t.priority === priority)
    return tasks
  }

  findById(id: number): Task | null {
    const task = this.store.get(id)
    if (!task) {
      return null
    }

    return task
  }

  create(input: TaskInput): Task {
    const { title, description, completed, priority } = input
    const id = crypto.randomInt(10_000)

    const task = {
      id,
      title,
      description,
      completed,
      priority,
    }

    this.store.set(id, task)

    return task
  }

  updateById(id: number, input: TaskInput): Task | null {
    const task = this.store.get(id)
    if (!task) {
      return null
    }

    this.store.set(id, { id, ...input })

    return task
  }

  deleteById(id: number) {
    const task = this.store.get(id)
    if (!task) {
      return null
    }

    this.store.delete(id)

    return task
  }
}

const taskStore = new TaskStore(tasks)

export default taskStore
