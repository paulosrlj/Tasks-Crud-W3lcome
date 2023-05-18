import { type Request, type Response } from "express";

import type TaskService from "../../services/TaskService";
import { type TaskUpdate, type TaskCreation } from "../../domain/models/Task";
import console from "console";
import { ResponseModel } from "../../domain/models/ResponseModel";

export default class TaskController {
  private readonly taskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  getAll(req: Request, res: Response): Express.Response {
    const tasks = this.taskService.getAll();

    return res.status(200).json(tasks);
  }

  getById(req: Request, res: Response): Express.Response {
    const taskId = parseInt(req.params.id) as unknown as number;

    const task = this.taskService.getById(taskId);

    return res.status(200).json(task);
  }

  create(req: Request, res: Response): Express.Response {
    const taskBody = req.body as TaskCreation;

    if (taskBody.titulo === undefined) {
      const response = {
        status: 400,
        title: "O título não pode vir vazio!",
        type: "Bad request",
        userMessage: "O título não pode vir vazio!",
      } as ResponseModel;

      return res.status(400).json(response);
    }

    const task = this.taskService.create(taskBody);

    return res.status(200).json(task);
  }

  update(req: Request, res: Response): Express.Response {
    const taskId = parseInt(req.params.id) as unknown as number;
    const taskBody = req.body as TaskUpdate;

    if (taskBody.concluida === undefined && taskBody.titulo === undefined) {
      const response = {
        status: 400,
        title: "Campos vazios!",
        type: "Bad request",
        userMessage: "Ambos os campos não podem vir vazios!",
      } as ResponseModel;

      return res.status(400).json(response);
    }

    const task = this.taskService.update(taskId, taskBody);

    return res.status(200).json(task);
  }

  delete(req: Request, res: Response): Express.Response {
    const taskId = parseInt(req.params.id) as unknown as number;

    try {
      this.taskService.delete(taskId);
    } catch (error: any) {
      if (error instanceof Error) {
        const response = {
          status: 400,
          title: "Task inexistente",
          type: "Bad request",
          userMessage: error.message,
        } as ResponseModel;
        return res.status(400).json(response);
      }
    }

    return res.status(200).end();
  }
}
