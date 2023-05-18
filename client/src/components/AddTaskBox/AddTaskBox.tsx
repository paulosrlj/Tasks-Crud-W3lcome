import styles from "./AddTaskBox.module.scss";

type Props = {
  taskTitle: string;
  addTaskFnc: () => Promise<void>;
  handleTitleChangeFnc: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

function AddTaskBox({ taskTitle, addTaskFnc, handleTitleChangeFnc }: Props) {
  return (
    <div className={styles.addBoxContainer}>
      <div className={styles.addBox}>
        <input
          type="text"
          className={styles.input}
          onChange={handleTitleChangeFnc}
          value={taskTitle}
        />
        <button type="button" className={styles.button} onClick={addTaskFnc}>
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default AddTaskBox;
