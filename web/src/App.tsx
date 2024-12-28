import { Nav } from "./components/Nav";
import { TasksGallery } from "./components/TasksGallery";
import { TasksContextProvider } from "./context/TasksContext";
import { ToastContextProvider } from "./context/ToastContext";

function App() {
  return (
    <>
      <ToastContextProvider>
        <TasksContextProvider>
          <Nav />
          <TasksGallery />
        </TasksContextProvider>
      </ToastContextProvider>
    </>
  );
}

export default App;
