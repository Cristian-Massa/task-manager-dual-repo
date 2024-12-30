import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { useTasks } from "../../context/TasksContext";
import { useFetch } from "../../hooks/useFetch";
import { ITasks } from "../../types/tasks";
import { useToast } from "../../context/ToastContext";
import { Switch } from "../Switch";
interface IFilterTaskModal {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterTaskModal({ isOpen, onClose }: IFilterTaskModal) {
  const { addToast } = useToast();
  const { isLoading, data, doFetch } = useFetch<ITasks[]>();
  const { setTasks, handleFilterTask } = useTasks();

  const [filter, setFilter] = useState<boolean | null>(null);

  function handleFilter(completed: boolean | null) {
    setFilter(completed);
  }

  function handleFilterTasks() {
    doFetch(`tasks${filter !== null ? `?filter=${filter}` : ""}`, "GET");
  }
  useEffect(() => {
    if (data) {
      setTasks(data);
      handleFilterTask(filter);
      addToast("Filters applied", "success");
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
      <div className="pt-6 pb-6 px-10">
        <p className="text-center p-2">Task status</p>
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 ">
            <label htmlFor="completed-tasks">Completed Tasks</label>
            <Switch
              type="radio"
              checked={filter === true && filter !== null}
              onChange={() => handleFilter(filter === true ? null : true)}
              htmlFor="completed-tasks"
            />
          </span>
          <span className="flex items-center gap-2 ">
            <label htmlFor="to-do-tasks">To do Tasks</label>
            <Switch
              type="radio"
              checked={filter === false && filter !== null}
              onChange={() => handleFilter(filter === false ? null : false)}
              htmlFor="to-do-tasks"
            />
          </span>
          <button
            className="active:bg-container-header transition-colors duration-100 bg-black text-white rounded-lg"
            onClick={() => handleFilter(null)}
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className="p-6 bg-black text-white flex justify-end gap-4">
        <button disabled={isLoading} onClick={onClose}>
          Cancel
        </button>
        <button disabled={isLoading} onClick={handleFilterTasks}>
          Filter
        </button>
      </div>
    </Modal>
  );
}
