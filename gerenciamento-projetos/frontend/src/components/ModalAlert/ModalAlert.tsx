import { ReactNode } from "react";
import "./ModalAlert.css";

interface ModalAlertProps {
  text: string;
  actionButton: ReactNode;
  onClose: (status: boolean) => void;
}

export function ModalAlert({ text, actionButton, onClose }: ModalAlertProps) {
  return (
    <div className="modal-alert">
      <p className="modal-alert-text">{text}</p>
      <div className="modal-alert-buttons-container">
        <button type="button" onClick={() => onClose(false)}>
          Voltar
        </button>
        {actionButton}
      </div>
    </div>
  );
}
