import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/admin/AuthPage";
import { HomePage } from "./pages/client/HomePage";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="admin/auth" element={<AuthPage />} />
      <Route path="admin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
