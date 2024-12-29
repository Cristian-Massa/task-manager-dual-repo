import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { useTasks } from "../../context/TasksContext";
import { useFetch } from "../../hooks/useFetch";
import { ITasks } from "../../types/tasks";
import { TextField } from "../TextField";
import { useToast } from "../../context/ToastContext";

interface ICreateTaskModal {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTaskModal({ isOpen, onClose }: ICreateTaskModal) {
  const initialData = {
    title: "",
    description: "",
  };
  const { addToast } = useToast();
  const { isLoading, data, doFetch } = useFetch();
  const { tasks, setTasks } = useTasks();
  const [taskInfo, setTaskInfo] = useState(initialData);
  function handleTaskInfo(info: string, id: string) {
    setTaskInfo((prev) => ({
      ...prev,
      [id]: info,
    }));
  }
  function handleCreateTask() {
    doFetch("tasks", "POST", JSON.stringify(taskInfo));
  }
  useEffect(() => {
    if (data) {
      setTasks([...(Array.isArray(tasks) ? tasks : []), data as ITasks]);
      setTaskInfo(initialData);
      addToast("Task created", "success");
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
          value={taskInfo.title}
        />
        <p>Task description</p>
        <TextField
          id="description"
          onChangeHandler={handleTaskInfo}
          placeholder="Write a description"
          value={taskInfo.description}
        />
      </div>
      <div className="p-6 bg-black text-white flex justify-end gap-4">
        <button disabled={isLoading} onClick={onClose}>
          Cancel
        </button>
        <button disabled={isLoading} onClick={handleCreateTask}>
          Create
        </button>
      </div>
    </Modal>
  );
}
