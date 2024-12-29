import { useEffect, useState } from "react";
import { ITasks } from "../../../types/tasks";
import { useFetch } from "../../../hooks/useFetch";
import { useTasks } from "../../../context/TasksContext";
import { useToast } from "../../../context/ToastContext";
import { Switch } from "../../Switch";

interface IEditCheckboxFromList {
  card: ITasks;
}

export function EditCheckboxFromList({ card }: IEditCheckboxFromList) {
  const { addToast } = useToast();
  const [isComplete, setIsComplete] = useState(card.completed);
  const { tasks, setTasks } = useTasks();
  const { doFetch, data, isLoading } = useFetch<ITasks>();

  const toggleStatus = () => {
    const newStatus = !isComplete;
    setIsComplete(newStatus);
    updateTaskStatus(newStatus);
  };

  const updateTaskStatus = (completed: boolean) => {
    doFetch(`tasks/${card._id}`, "PUT", JSON.stringify({ ...card, completed }));
  };

  useEffect(() => {
    if (data) {
      const index = tasks.findIndex((task) => task._id === data._id);
      if (index !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = data;
        setTasks(updatedTasks);
        addToast("Task status updated successfully", "success");
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center gap-1">
      <label className="text-white" htmlFor={`updateStatus-${card._id}`}>
        Task done
      </label>
      <Switch
        type="checkbox"
        onChange={toggleStatus}
        checked={isComplete}
        disabled={isLoading}
        htmlFor={`updateStatus-${card._id}`}
        id={`updateStatus-${card._id}`}
      />
    </div>
  );
}
