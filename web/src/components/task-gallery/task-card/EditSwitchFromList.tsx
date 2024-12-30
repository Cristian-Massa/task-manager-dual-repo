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
  const { updateTask, removeTask, filter } = useTasks();
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
    if (isComplete === previusValue) return;
    setPreviusValue(isComplete);
    filter !== null
      ? removeTask(card._id)
      : updateTask(card._id, { ...card, completed: isComplete });
    addToast("Task status updated successfully", "success");
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
        onChange={toggleStatus}
        checked={isComplete}
        disabled={isLoading}
        htmlFor={`updateStatus-${card._id}`}
        id={`updateStatus-${card._id}`}
      />
    </div>
  );
}
