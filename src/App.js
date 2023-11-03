import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./component/Register";
import Main from "./component/Main";
import Login from "./component/Login";
import Netflix from "./component/netflixPage";
import GoogleTrands from "./component/googleTrends";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
