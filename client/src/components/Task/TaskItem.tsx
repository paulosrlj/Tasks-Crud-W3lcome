import styles from "./TaskItem.module.scss";
import { AiFillDelete } from "react-icons/ai";

export type Task = {
  id: number;
  titulo: string;
  concluida: boolean;
};

type Props = {
  task: Task;
  updateFunction: (taskId: number, concluida: boolean) => Promise<void>;
  deleteFunction: (taskId: number) => Promise<void>;
};

function Task({ task, deleteFunction, updateFunction }: Props) {
  return (
    <div
      className={`${styles.task} ${task.concluida ? styles.taskDone : ""}`}
      key={task.id}
    >
      <input
        type="checkbox"
        id="checkboxDone"
        name="checkboxDone"
        className={styles.checkboxDone}
        defaultChecked={task.concluida}
        onChange={() => updateFunction(task.id, task.concluida)}
      />

      <p>{task.titulo}</p>

      <div className={styles.taskOpts}>
        <AiFillDelete
          size={25}
          className={styles.taskIcon}
          onClick={() => deleteFunction(task.id)}
        />
      </div>
    </div>
  );
}

export default Task;
