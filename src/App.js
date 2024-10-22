import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from './route/PrivateRoute';
import { useEffect, useState } from "react";
import api from './utils/api';

function App() {
  const [user, setUser] = useState(null);
  const getUser = async() => {
    try{
      const storedToken = sessionStorage.getItem("token") // Login페이지에서 setItem 한 "token" 불러오기
      if(storedToken) {
        const response = await api.get("/user/me")
        console.log("get me response", response)
        setUser(response.data.user)
      }
    }catch(error){
      setUser(null)
    
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute user={user}><TodoPage /></PrivateRoute>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
    </Routes>
  );
}

export default App;
