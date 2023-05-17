import { Router } from 'express'
import TaskController from '../api/controllers/TaskController'

const taskController = new TaskController()

const router = Router()

router.get('/', taskController.getAll.bind(taskController))

router.get('/t', (req, res) => {
  return res.json('OI')
})

export default router
