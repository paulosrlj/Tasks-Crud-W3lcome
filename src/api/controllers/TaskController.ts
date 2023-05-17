import { type Request, type Response } from 'express'
import { tasks } from '../../data'

export default class TaskController {
  getAll (req: Request, res: Response): Express.Response {
    return res.status(200).json(tasks)
  }
}
