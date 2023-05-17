import { type Request, type Response } from 'express'

import type TaskService from '../../services/TaskService'
import { type TaskUpdate, type TaskCreation } from '../../domain/models/Task'

export default class TaskController {
  private readonly taskService

  constructor (taskService: TaskService) {
    this.taskService = taskService
  }

  getAll (req: Request, res: Response): Express.Response {
    const tasks = this.taskService.getAll()

    return res.status(200).json(tasks)
  }

  getById (req: Request, res: Response): Express.Response {
    const taskId = parseInt(req.params.id) as unknown as number

    const task = this.taskService.getById(taskId)

    return res.status(200).json(task)
  }

  create (req: Request, res: Response): Express.Response {
    const taskBody = req.body as TaskCreation

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
