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

interface ITasksContext {
  tasks: ITasks[];
  setTasks: Dispatch<SetStateAction<ITasks[]>>;
}

const TasksContext = createContext<ITasksContext>({
  tasks: [],
  setTasks: () => {},
});

interface ITasksContextProvider {
  children: React.ReactNode;
}

export function TasksContextProvider({ children }: ITasksContextProvider) {
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const { data, doFetch } = useFetch<ITasks[]>();

  useEffect(() => {
    doFetch("tasks", "GET");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
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
