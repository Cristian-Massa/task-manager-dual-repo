import { useEffect, useState } from "react";
import { Modal } from "../../Modal";
import { useTasks } from "../../../context/TasksContext";
import { useFetch } from "../../../hooks/useFetch";
import { ITasks } from "../../../types/tasks";
import { TextField } from "../../TextField";
import { useToast } from "../../../context/ToastContext";

interface IEditTaskModal {
  isOpen: boolean;
  onClose: () => void;
  card: ITasks;
}

export function EditTaskModal({ isOpen, onClose, card }: IEditTaskModal) {
  const { isLoading, data, doFetch } = useFetch<ITasks>();
  const { addToast } = useToast();
  const { tasks, setTasks } = useTasks();
  const [taskInfo, setTaskInfo] = useState({
    title: card.title ?? "",
    description: card.description ?? "",
    completed: card.completed ?? false,
  });
  function handleTaskInfo(info: string | boolean, id: string) {
    setTaskInfo((prev) => ({
      ...prev,
      [id]: info,
    }));
  }

  function handleUpdateTask() {
    doFetch(`tasks/${card._id}`, "PUT", JSON.stringify(taskInfo));
  }
  useEffect(() => {
    if (data) {
      const index = tasks.findIndex((element) => element._id === data._id);

      if (index !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = data;
        setTasks(updatedTasks);
        addToast("Info edited", "success");
      }
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Modal
      title="Create Task"
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
    >
      <div className="p-20">
        <p>Task title</p>
        <TextField
          id="title"
          onChangeHandler={handleTaskInfo}
          placeholder="Write a title"
          defaultValue={card.title}
        />
        <p>Task description</p>
        <TextField
          id="description"
          onChangeHandler={handleTaskInfo}
          placeholder="Write a description"
          defaultValue={card.description}
        />
        <p>Task status</p>
        <div className="flex gap-1">
          <input
            id="completed"
            defaultChecked={taskInfo.completed}
            type="checkbox"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleTaskInfo(e.currentTarget.checked, e.currentTarget.id)
            }
          />
          <p>Completed</p>
        </div>
      </div>
      <div className="p-6 bg-container-secondary text-white flex justify-end gap-4">
        <button disabled={isLoading} onClick={onClose}>
          Cancel
        </button>
        <button disabled={isLoading} onClick={handleUpdateTask}>
          Update
        </button>
      </div>
    </Modal>
  );
}
