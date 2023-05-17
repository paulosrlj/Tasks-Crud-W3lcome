import { Router } from 'express'
import TaskController from '../api/controllers/TaskController'
import TaskService from '../services/TaskService'

// Injeção de dependência
const taskService = new TaskService()
const taskController = new TaskController(taskService)

const router = Router()

router.get('/', taskController.getAll.bind(taskController))
router.get('/:id', taskController.getById.bind(taskController))
router.post('/', taskController.create.bind(taskController))
router.patch('/:id', taskController.update.bind(taskController))
router.delete('/:id', taskController.delete.bind(taskController))

router.get('/health', (req, res) => {
  return res.json('API está ok')
})

export default router
