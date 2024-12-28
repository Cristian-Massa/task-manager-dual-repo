import { useEffect, useState } from "react";
import { ITasks } from "../../../types/tasks";
import { useFetch } from "../../../hooks/useFetch";
import { useTasks } from "../../../context/TasksContext";
import { useToast } from "../../../context/ToastContext";

interface IEditCheckboxFromList {
  card: ITasks;
}
export function EditCheckboxFromList({ card }: IEditCheckboxFromList) {
  const { addToast } = useToast();
  const [isComplete, setIsComplete] = useState(card.completed);
  const { data, doFetch } = useFetch<ITasks>();
  const { tasks, setTasks } = useTasks();

  function toggleStatus() {
    setIsComplete((prev) => {
      const newStatus = !prev;
      doFetch(
        `tasks/${card._id}`,
        "PUT",
        JSON.stringify({ ...card, completed: newStatus })
      );
      return newStatus;
    });
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="flex items-center gap-1">
      <label htmlFor={`updateStatus-${card._id}`}>Complete</label>
      <input
        onChange={toggleStatus}
        checked={isComplete}
        id={`updateStatus-${card._id}`}
        type="checkbox"
      />
    </div>
  );
}
