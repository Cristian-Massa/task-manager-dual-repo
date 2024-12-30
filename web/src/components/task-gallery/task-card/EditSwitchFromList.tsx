import { useEffect, useState } from "react";
import { ITasks } from "../../../types/tasks";
import { useFetch } from "../../../hooks/useFetch";
import { useTasks } from "../../../context/TasksContext";
import { useToast } from "../../../context/ToastContext";
import { Switch } from "../../Switch";

interface IEditSwitchFromList {
  card: ITasks;
}

export function EditSwitchFromList({ card }: IEditSwitchFromList) {
  const { addToast } = useToast();
  const [isComplete, setIsComplete] = useState(card.completed);
  const [previusValue, setPreviusValue] = useState(isComplete);
  const { tasks, setTasks } = useTasks();
  const { doFetch, errors, isLoading } = useFetch<ITasks>();

  const toggleStatus = () => {
    setIsComplete(!isComplete);
    updateTaskStatus(!isComplete);
  };

  const updateTaskStatus = (completed: boolean) => {
    doFetch(`tasks/${card._id}`, "PUT", JSON.stringify({ ...card, completed }));
  };
  // This function listens to clicks on the switch to optimistically update the UI.
  useEffect(() => {
    setPreviusValue(isComplete);
    const index = tasks.findIndex((task) => task._id === card._id);
    if (index !== -1 && isComplete !== previusValue) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = { ...card, completed: isComplete };
      setTasks(updatedTasks);
      addToast("Task status updated successfully", "success");
    }
  }, [isComplete]);
  // This function listens for errors to revert changes in the UI.
  useEffect(() => {
    if (errors?.length) {
      setIsComplete(!isComplete);
      addToast("Error updating task status", "error");
    }
  }, [errors?.length]);

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
