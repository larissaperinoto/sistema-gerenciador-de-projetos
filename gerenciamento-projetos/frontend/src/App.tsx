import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "./layouts/Main/Main";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Projects } from "./components/Projects/Projects";
import { ProjectTeam } from "./components/ProjectTeam/ProjectTeam";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={isAuthenticated && <Main content={<Projects />} />}
      />
      <Route
        path="/project/:projectId/members"
        element={isAuthenticated && <Main content={<ProjectTeam />} />}
      />
    </Routes>
  );
}

export default App;
