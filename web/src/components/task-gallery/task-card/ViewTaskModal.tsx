import { useEffect } from "react";
import { Modal } from "../../Modal";
import { useFetch } from "../../../hooks/useFetch";
import { ITasks } from "../../../types/tasks";
interface IEditTaskModal {
  isOpen: boolean;
  onClose: () => void;
  card: ITasks;
}

export function ViewTaskModal({ isOpen, onClose, card }: IEditTaskModal) {
  const { isLoading, data, doFetch } = useFetch<ITasks>();
  useEffect(() => {
    if (isOpen) {
      doFetch(`tasks/${card._id}`, "GET");
    }
  }, [isOpen]);

  return (
    <Modal
      title="View Task"
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
    >
      <div className="p-4 w-[300px] min-h-[300px]">
        {data ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-center">{data?.title}</h2>
            <p>{data?.description}</p>
          </div>
        ) : (
          <div className="h-full flex justify-center items-center">
            <p>Loading</p>
          </div>
        )}
      </div>

      <div className="p-6 bg-container-secondary text-white flex justify-end gap-4">
        <button disabled={isLoading} onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
