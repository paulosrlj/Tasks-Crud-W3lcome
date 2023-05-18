import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./App.module.scss";

import TaskItem, { Task } from "./components/Task/TaskItem";
import AddTaskBox from "./components/AddTaskBox/AddTaskBox";



function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Array<Task>>([]);

  // Buscar as tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get("http://localhost:5000/api/tasks/");
      return data;
    };

    fetchTasks().then((response) => {
      setTasks(response);
    });
  }, [tasks]);

  function handleTodoTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value);
  }

  async function createTask() {
    if (taskTitle.length === 0) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/tasks/`, {
        titulo: taskTitle,
      });

      const createdTask = response.data as Task;

      setTasks((oldState) => {
        const newState = [...oldState];
        newState.push(createdTask);
        return newState;
      });

      setTaskTitle("");
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTask(taskId: number, concluida: boolean) {
    try {
      concluida = !concluida;
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          concluida,
        }
      );

      const updatedTask = response.data as Task;

      const index = tasks.findIndex((t) => t.id === updatedTask.id);

      setTasks((oldState) => {
        const newState = [...oldState];
        newState[index] = updatedTask;
        return newState;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTask(taskId: number) {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      const index = tasks.findIndex((t) => t.id === taskId);

      setTasks((oldState) => {
        const newState = [...oldState];
        newState.splice(index, 1);
        return newState;
      });

      console.log("Update concluido");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tasksBox}>
        
        <AddTaskBox addTaskFnc={createTask} handleTitleChangeFnc={handleTodoTitleChange} taskTitle={taskTitle} />
        
        <div className={styles.tasksList}>
          {tasks.map((t) => (
           <TaskItem task={t} deleteFunction={deleteTask} updateFunction={updateTask} key={t.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
