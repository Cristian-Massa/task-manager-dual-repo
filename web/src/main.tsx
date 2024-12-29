import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TasksContextProvider } from "./context/TasksContext.tsx";
import { ToastContextProvider } from "./context/ToastContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContextProvider>
      <AuthContextProvider>
        <TasksContextProvider>
          <App />
        </TasksContextProvider>
      </AuthContextProvider>
    </ToastContextProvider>
  </StrictMode>
);
