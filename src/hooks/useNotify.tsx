import { useMemo } from "react";
import { toast } from "react-toastify";

const COLORS = {
  error: "#dc2626",
  info: "#6366f1",
  success: "#16a34a",
  warn: "#facc15",
};

export const useNotify = () => {
  const notifier = useMemo(() => {
    const _notify = (text: string, color: string) => {
      console.log("Toast", text);
      toast(text, {
        progressStyle: { background: color },
        position: toast.POSITION.TOP_CENTER,
      });
    };
    return {
      error: (text: string) => _notify(text, COLORS.error),
      info: (text: string) => _notify(text, COLORS.info),
      success: (text: string) => _notify(text, COLORS.success),
      warn: (text: string) => _notify(text, COLORS.warn),
    };
  }, []);

  return notifier;
};
