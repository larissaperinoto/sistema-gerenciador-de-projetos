import { ReactNode } from "react";
import "./ModalAlert.css";

interface ModalAlertProps {
  text: string;
  actionButton: ReactNode;
  onClose: (status: boolean) => void;
}

export function ModalAlert({ text, actionButton, onClose }: ModalAlertProps) {
  return (
    <div className="modal-container">
      <div className="modal">
        <p className="text">{text}</p>
        <div className="modal-alert-buttons-container">
          <button
            type="button"
            className="button button-gray"
            onClick={() => onClose(false)}
          >
            Voltar
          </button>
          {actionButton}
        </div>
      </div>
    </div>
  );
}
