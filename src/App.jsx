import "./App.css";
import { Routes } from "react-router-dom";
import { clientRoutes } from "@client/routes";
import { adminRoutes } from "@admin/routes";
import { useToast } from "@shared/hooks/useToast";
import { ToastContainer } from "@shared/components/toast/ToastContainer";

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <Routes>
        {clientRoutes}
        {adminRoutes}
      </Routes>
    </>
  );
}

export default App;
