import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function ModalWrapper({ children, onClose }) {
  const modalRoot = document.getElementById('modal-root');
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      className={`bg-blk/30 fixed inset-0 z-60 flex items-end justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} `}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-w-mobile w-full transform rounded-t-xl bg-white shadow-xl transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} `}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
}
