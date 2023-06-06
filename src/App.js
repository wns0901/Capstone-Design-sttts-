import { Route, Routes } from 'react-router-dom';
import './App.css';
import Hello from './component/Hello';
import Register from './component/Register';
import Main from './component/Main';
import Login from './component/Login';
import Search from './component/search';
import Netflix from './component/netflixPage';
import Youtube from './component/Youtube';
import Melon from './component/Melon';
import Jusic from './component/Jusic';
import GoogleTrands from './component/googleTrends';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/main"
          element={<Main />}
        />
        <Route
          path="/netflix"
          element={<Netflix />}
        />
        <Route
          path="/trends"
          element={<GoogleTrands />}
        />
      </Routes>
    </div>
  );
}

export default App;
