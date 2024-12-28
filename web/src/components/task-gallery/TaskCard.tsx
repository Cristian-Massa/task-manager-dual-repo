import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ITasks } from "../../types/tasks";
import { useTasks } from "../../context/TasksContext";
import { EditTaskModal } from "./task-card/EditTaskModal";
import { useToast } from "../../context/ToastContext";
import { EditCheckboxFromList } from "./task-card/EditCheckboxFromList";

interface ITaskCard {
  card: ITasks;
}

export function TaskCard({ card }: ITaskCard) {
  const { addToast } = useToast();
  const { tasks, setTasks } = useTasks();
  const { data, doFetch } = useFetch<string>();
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen() {
    setIsOpen((prev) => !prev);
  }

  async function handleDelete() {
    doFetch(`tasks/${card._id}`, "DELETE");
  }

  useEffect(() => {
    if (data) {
      setTasks(tasks?.filter((task) => task._id !== card._id));
      addToast(data, "success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="w-[300px] relative border shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between p-2 text-center bg-container-header">
        <h1 className="truncate">{card.title}</h1>
        <EditCheckboxFromList card={card} />
      </div>
      <div className="p-2">
        <p>Created at: {new Date(card.createdAt).toDateString()}</p>
      </div>
      <div className="px-2 min-h-10">
        <p className="text-ellipsis break-words">{card.description}</p>
      </div>
      <div className="bg-container-secondary sticky bottom-0 right-0 left-0 flex justify-end gap-4 py-2 px-4">
        <button onClick={handleDelete}>delete</button>
        <button onClick={toggleIsOpen}>edit</button>
      </div>
      <EditTaskModal isOpen={isOpen} onClose={toggleIsOpen} card={card} />
    </div>
  );
}
