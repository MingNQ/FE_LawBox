import "./App.css";
import { Routes } from "react-router-dom";
import { clientRoutes } from "@client/routes";
import { adminRoutes } from "@admin/routes";

function App() {
  return (
    <Routes>
      {clientRoutes}
      {adminRoutes}
    </Routes>
  );
}

export default App;
