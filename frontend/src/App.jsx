// import './App.css';
import Home from './pages/Home';
import {BrowserRouter,Routes, Route}from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Logout from './pages/Logout';

function App() {
  
  return (
    //React　Router 画面切り替え機能
    <BrowserRouter>

    <Navbar />

    <Routes>

    <Route path='/' element={<Home />}/>

    <Route path='/signup' element={<Signup />}/>

    <Route path='/login' element={<Login />}/>

    <Route path='/logout' element={<Logout/>}/>

    </Routes>

    </BrowserRouter>

  );
}

export default App;
