import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";

import { AiOutlineCheck, AiFillDelete } from "react-icons/ai";

import styles from "./App.module.scss";

type Task = {
  id: number;
  titulo: string;
  concluida: boolean;
};

function App() {
  const [taskTitle, setTaskTitle] = useState('');
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
      const response = await axios.post(
        `http://localhost:5000/api/tasks/`,
        {
          titulo: taskTitle,
        }
      );
  
      const createdTask = response.data as Task;
  
      setTasks((oldState) => {
        const newState = [...oldState];
        newState.push(createdTask);
        return newState;
      });

      setTaskTitle('');

    } catch (error) {
      console.error(error);
    }
  }

  async function updateTask(taskId: number, concluida: boolean) {
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

    console.log("Update concluido");
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
        <div className={styles.addBoxContainer}>
          <div className={styles.addBox}>
            <input type="text" className={styles.input} onChange={handleTodoTitleChange} value={taskTitle} />
            <button type="button" className={styles.button} onClick={createTask}>
              Adicionar
            </button>
          </div>
        </div>

        <div className={styles.tasksList}>
          {tasks.map((t) => (
            <div
              className={`${styles.task} ${t.concluida ? styles.taskDone : ""}`}
              key={t.id}
            >
              <input
                type="checkbox"
                id="checkboxDone"
                name="checkboxDone"
                className={styles.checkboxDone}
                defaultChecked={t.concluida}
                onChange={() => updateTask(t.id, t.concluida)}
              />

              <p>{t.titulo}</p>

              <div className={styles.taskOpts}>
                <AiFillDelete size={25} className={styles.taskIcon} onClick={() => deleteTask(t.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
