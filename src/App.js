import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hello from "./component/Hello";
import Register from "./component/Register";
import Main from "./component/Main";
import Login from "./component/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
