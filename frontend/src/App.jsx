// import './App.css';
import Home from './pages/Home';
import {BrowserRouter,Routes, Route}from "react-router-dom";

function App() {
  
  return (
    //React　Router 画面切り替え機能
    <BrowserRouter>

    <Routes>

    <Route path='/' element={<Home />}/>

    </Routes>

    </BrowserRouter>

  );
}

export default App;
