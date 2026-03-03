import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/admin/AuthPage";
import { HomePage } from "./pages/client/HomePage";
import Dashboard from "./pages/admin/Dashboard";
import ConversationPage from "./pages/client/chat/ConversationPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="chat" element={<ConversationPage />} />
      <Route path="admin/auth" element={<AuthPage />} />
      <Route path="admin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
