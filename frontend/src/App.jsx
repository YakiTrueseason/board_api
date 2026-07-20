// import './App.css';
import Home from './pages/Home';
import {BrowserRouter,Routes, Route}from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  
  return (
    //React　Router 画面切り替え機能
    <BrowserRouter>

    <Navbar />

    <Routes>

    <Route 
      path='/'
      element={
        <ProtectedRoute>
        <Home />
        </ProtectedRoute>
      }
    />

    <Route 
      path='/signup' 
      element={
        <Signup />}
    />

    <Route 
      path='/login' 
      element={
        <Login />}
    />

    <Route 
      path='/logout'
      element={
        <ProtectedRoute>
        <Logout/>
        </ProtectedRoute>
      }
    />

    </Routes>

    </BrowserRouter>

  );
}

export default App;
