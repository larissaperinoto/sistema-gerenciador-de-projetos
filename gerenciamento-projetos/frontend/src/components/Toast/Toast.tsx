// Toast.tsx
import React from "react";
import "./Toast.css";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="toast">
      <span>{message}</span>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};
