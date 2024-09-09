import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main } from "./layouts/Main/Main";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main content={<Login />} />} />
    </Routes>
  );
}

export default App;
