import { Route, Routes } from "react-router-dom";
import "./App.css";
import Test from "./test";
import Hello from "./Hello";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
