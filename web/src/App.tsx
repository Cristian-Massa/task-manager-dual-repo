import { Nav } from "./components/Nav";
import { TasksGallery } from "./components/TasksGallery";
import { Auth } from "./components/Auth";
import { useAuth } from "./context/AuthContext";
function App() {
  const { isLoading, isAuthenticated } = useAuth();

  return (
    <>
      <Nav />
      {isLoading ? (
        <div className="flex h-[80vh] justify-center items-center">Loading</div>
      ) : isAuthenticated ? (
        <TasksGallery />
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
