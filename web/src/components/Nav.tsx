import { Dispatch, SetStateAction, useState } from "react";
import { CreateTaskModal } from "./nav/CreateTaskModal";
import { FilterTaskModal } from "./nav/FilterTaskModal";
import { useAuth } from "../context/AuthContext";

export function Nav() {
  const { isAuthenticated } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  function toggleCreateModal(cb: Dispatch<SetStateAction<boolean>>) {
    cb((prev) => !prev);
  }
  return (
    <nav className="bg-container-header h-20 flex items-center p-4">
      <ul className="flex justify-between w-full">
        <li>
          <h1 className="font-bold">Task Manager App</h1>
        </li>
        <li className="flex gap-4">
          <button
            disabled={!isAuthenticated}
            onClick={() => toggleCreateModal(setIsFilterModalOpen)}
          >
            Filter
          </button>
          <button
            disabled={!isAuthenticated}
            onClick={() => toggleCreateModal(setIsCreateModalOpen)}
          >
            Create
          </button>
        </li>
      </ul>
      {isAuthenticated && (
        <>
          <CreateTaskModal
            isOpen={isCreateModalOpen}
            onClose={() => toggleCreateModal(setIsCreateModalOpen)}
          />
          <FilterTaskModal
            isOpen={isFilterModalOpen}
            onClose={() => toggleCreateModal(setIsFilterModalOpen)}
          />
        </>
      )}
    </nav>
  );
}
