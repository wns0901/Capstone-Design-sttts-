import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hello from "./component/Hello";
import Register from "./component/Register";
import Main from "./component/Main";
import Login from "./component/Login";
import Search from "./component/search";
import Netflix from "./component/netflixPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/netflix" element={<Netflix />} />
      </Routes>
    </div>
  );
}

export default App;
