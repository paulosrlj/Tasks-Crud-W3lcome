import { type TaskUpdate, type Task } from '../domain/models/Task'

import { tasks } from '../data'

export default class TaskService {
  getById (taskId: number): Task {
    const index = tasks.findIndex((value) => value.id === taskId)
    return tasks[index]
  }

  create (task: Task): Task {
    tasks.push(task)
    return task
  }

  update (taskId: number, task: TaskUpdate): Task {
    const index = tasks.findIndex((value) => value.id === taskId)
    const currentTask = tasks[index]

    if (task.concluida !== undefined) {
      currentTask.concluida = task.concluida
    }

    if (task.titulo !== undefined) {
      currentTask.titulo = task.titulo
    }

    tasks[index] = currentTask
    return currentTask
  }

  delete (taskId: number): void {
    const index = tasks.findIndex((value) => value.id === taskId)
    tasks.splice(index, 1)
  }
}
