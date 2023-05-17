import { type Request, type Response } from 'express'

import type TaskService from '../../services/TaskService'
import { type TaskUpdate, type Task } from '../../domain/models/Task'

export default class TaskController {
  private readonly taskService

  constructor (taskService: TaskService) {
    this.taskService = taskService
  }

  getById (req: Request, res: Response): Express.Response {
    console.log(req.params.id)
    const taskId = parseInt(req.params.id) as unknown as number

    const task = this.taskService.getById(taskId)

    return res.status(200).json(task)
  }

  create (req: Request, res: Response): Express.Response {
    console.log(req.body)

    const taskBody = req.body as Task

    const task = this.taskService.create(taskBody)

    return res.status(200).json(task)
  }

  update (req: Request, res: Response): Express.Response {
    const taskId = parseInt(req.params.id) as unknown as number
    const taskBody = req.body as TaskUpdate

    const task = this.taskService.update(taskId, taskBody)

    return res.status(200).json(task)
  }

  delete (req: Request, res: Response): Express.Response {
    const taskId = parseInt(req.params.id) as unknown as number

    this.taskService.delete(taskId)

    return res.status(200).end()
  }
}
