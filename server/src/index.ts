import express, { type Express } from "express";
import cors from "cors";

import tasksRoutes from "./routes/task.routes";
class App {
  app: Express;

  routes(): void {
    this.app.use("/api/tasks", tasksRoutes);
  }

  middlewares(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors({ origin: "http://127.0.0.1:5173" }));
  }

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
}

const { app } = new App();

app.listen(5000, () => {
  console.log("Ouvindo na porta 5000");
});
