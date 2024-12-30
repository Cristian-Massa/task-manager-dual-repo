import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";
import { TaskCard } from "./task-gallery/TaskCard";
import { motion, AnimatePresence } from "framer-motion";

export function MainContainer() {
  const { tasks } = useTasks();
  const { isAuthenticated } = useAuth();
  const completedTasks =
    Array.isArray(tasks) && tasks?.filter((task) => task.completed === true);
  const todoTasks =
    Array.isArray(tasks) && tasks?.filter((task) => task.completed === false);
  console.log(tasks);
  if (!isAuthenticated) {
    return (
      <main className="flex h-[90vh] justify-center items-center">
        <p className="font-bold text-xl">Log in to see your tasks</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col md:flex-row items-center md:items-start  justify-center md:w-full gap-4 p-10">
      {Array.isArray(completedTasks) && !!completedTasks.length && (
        <section className="flex flex-col gap-2 ">
          <h1 className="text-center font-bold text-xl">Completed tasks</h1>
          <AnimatePresence>
            {completedTasks.map((task) => (
              <motion.div
                key={task._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <TaskCard card={task} />
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      )}
      {Array.isArray(todoTasks) && !!todoTasks.length && (
        <section className="flex flex-col gap-2">
          <h1 className="text-center font-bold text-xl">To do tasks</h1>
          <AnimatePresence>
            {todoTasks.map((task) => (
              <motion.div
                layout
                key={task._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TaskCard card={task} />
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      )}
      {!tasks.length && (
        <div className="flex h-[80vh] justify-center items-center">
          <p className="font-bold">No Tasks found. Add some</p>
        </div>
      )}
    </main>
  );
}
