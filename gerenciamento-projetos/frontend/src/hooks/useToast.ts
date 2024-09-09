import { useState } from "react";

interface ToastOptions {
  duration?: number;
}

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string | null, options: ToastOptions = {}) => {
    setMessage(msg);
    if (options.duration) {
      setTimeout(() => {
        setMessage(null);
      }, options.duration);
    }
  };

  return {
    message,
    showToast,
  };
}
