import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ITasks } from "../../types/tasks";
import { useTasks } from "../../context/TasksContext";
import { EditTaskModal } from "./task-card/EditTaskModal";
import { useToast } from "../../context/ToastContext";
import { EditCheckboxFromList } from "./task-card/EditCheckboxFromList";
import { ViewTaskModal } from "./task-card/ViewTaskModal";

interface ITaskCard {
  card: ITasks;
}

export function TaskCard({ card }: ITaskCard) {
  const { addToast } = useToast();
  const { tasks, setTasks } = useTasks();
  const { data, doFetch, isLoading } = useFetch<string>();

  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);

  function toggleIsOpen(cb: Dispatch<SetStateAction<boolean>>) {
    cb((prev) => !prev);
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
    <>
      <div className="w-[300px] grid grid-cols-3 border shadow-md rounded-lg overflow-hidden">
        <div className="col-span-2 flex flex-col justify-between p-2 text-center bg-container-header">
          <div>
            <h1 className="truncate">{card.title}</h1>
          </div>
          <div className="bg-principal rounded-lg border">
            <p>{new Date(card.createdAt).toDateString()}</p>
          </div>
        </div>
        <div className="p-2 bg-black flex flex-col">
          <button disabled={isLoading} onClick={handleDelete}>
            delete
          </button>
          <button onClick={() => toggleIsOpen(setIsEditTaskModalOpen)}>
            edit
          </button>
          <button onClick={() => toggleIsOpen(setIsViewTaskModalOpen)}>
            view
          </button>
          <EditCheckboxFromList card={card} />
        </div>
      </div>
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={() => toggleIsOpen(setIsEditTaskModalOpen)}
        card={card}
      />
      <ViewTaskModal
        isOpen={isViewTaskModalOpen}
        onClose={() => toggleIsOpen(setIsViewTaskModalOpen)}
        card={card}
      />
    </>
  );
}
