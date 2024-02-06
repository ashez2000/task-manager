import fs from 'node:fs'
import crypto from 'node:crypto'

const tasks = JSON.parse(fs.readFileSync('./data/tasks.json', 'utf8')) as Task[]

export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
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

  findById(id: number): Task | null {
    const task = this.store.get(id)
    if (!task) {
      return null
    }

    return task
  }

  create(title: string, description: string, completed: boolean): Task {
    const id = crypto.randomInt(10_000)

    const task = {
      id,
      title,
      description,
      completed,
    }

    this.store.set(id, task)

    return task
  }

  updateById(
    id: number,
    title: string,
    description: string,
    completed: boolean
  ): Task | null {
    const task = this.store.get(id)
    if (!task) {
      return null
    }

    const update = {
      id,
      title,
      description,
      completed,
    }

    this.store.set(id, update)

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
