import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ITasks } from "../types/tasks";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "./AuthContext";

interface ITasksContext {
  tasks: ITasks[];
  setTasks: Dispatch<SetStateAction<ITasks[]>>;
  addTask: (task: ITasks) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, updatedTask: ITasks) => void;
  handleFilterTask: (completed: boolean | null) => void;
  filter: boolean | null;
}

const TasksContext = createContext<ITasksContext>({
  tasks: [],
  setTasks: () => {},
  addTask: () => {},
  removeTask: () => {},
  updateTask: () => {},
  handleFilterTask: () => {},
  filter: null,
});

interface ITasksContextProvider {
  children: React.ReactNode;
}

export function TasksContextProvider({ children }: ITasksContextProvider) {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const { data, doFetch } = useFetch<ITasks[]>();
  const [filter, setFilter] = useState<boolean | null>(null);
  const handleFilterTask = (completed: boolean | null) => {
    setFilter(completed);
  };
  const addTask = (task: ITasks) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

  const updateTask = (id: string, updatedTask: ITasks) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  useEffect(() => {
    if (isAuthenticated) {
      doFetch("tasks", "GET");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        removeTask,
        updateTask,
        handleFilterTask,
        filter,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksContextProvider");
  }
  return context;
}
