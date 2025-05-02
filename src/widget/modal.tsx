import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  const modalRoot = document.getElementById("modal-root");
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  const modalContent = (
    <div
      className={`
        fixed inset-0 z-60 flex items-end justify-center bg-black/30 transition-opacity duration-300
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-t-3xl shadow-xl max-w-mobile w-full transform transition-all duration-300
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
}

