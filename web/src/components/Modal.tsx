import { createPortal } from "react-dom";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isLoading: boolean;
}
export function Modal({ isOpen, onClose, title, children, isLoading }: IModal) {
  return createPortal(
    <div
      onClick={() => {
        if (isLoading) return;
        onClose();
      }}
      className={`transition-all duration-75 fixed top-0 right-0 left-0 bottom-0 fade-in bg-opacity-55 flex justify-center items-center bg-black ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
        className={`bg-principal rounded-lg overflow-hidden shadow-xl ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } transition-all duration-100`}
      >
        <div className="bg-container-header p-6  text-center">
          <h1 className="font-bold">{title}</h1>
        </div>
        {children}
      </div>
    </div>,
    document.querySelector("body")!
  );
}
