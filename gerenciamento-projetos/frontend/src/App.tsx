import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main } from "./layouts/Main/Main";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main content={<Login />} />} />
      <Route path="/register" element={<Main content={<Register />} />} />
    </Routes>
  );
}

export default App;
