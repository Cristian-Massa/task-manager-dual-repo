import { createContext, ReactNode, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { TYPE_COLORS } from "../constants/toastColors";
type Type = "message" | "success" | "error";
interface IToast {
  id: number;
  message: string;
  type: Type;
}

interface IToastContext {
  addToast: (message: string, type: Type) => void;
}

const ToastContext = createContext<IToastContext | undefined>(undefined);

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface IToastContextProvider {
  children: ReactNode;
}
export function ToastContextProvider({ children }: IToastContextProvider) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = (message: string, type: Type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => removeToast(id), 1000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <motion.div className="fixed bottom-6 right-6 flex flex-col">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`${
                  TYPE_COLORS[toast.type]
                } text-white px-4 py-2 rounded shadow-md mb-2 flex items-center justify-between`}
              >
                <span>
                  {toast.message}{" "}
                  <button
                    className="text-white"
                    onClick={() => removeToast(toast.id)}
                  >
                    X
                  </button>
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
