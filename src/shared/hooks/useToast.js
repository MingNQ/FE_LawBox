import { useContext } from "react";
import { ToastContext } from "@shared/contexts/ToastContext";

export function useToast() {
  return useContext(ToastContext);
}
