import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main } from "./layouts/Main/Main";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Projects } from "./components/Projects/Projects";
import { ProjectTeam } from "./components/ProjectTeam/ProjectTeam";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main content={<Login />} />} />
      <Route path="/register" element={<Main content={<Register />} />} />
      <Route path="/dashboard" element={<Main content={<Projects />} />} />
      <Route
        path="/project/:projectId/members"
        element={<Main content={<ProjectTeam />} />}
      />
    </Routes>
  );
}

export default App;
